import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb"
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { Blog, blogFromItem, BlogItem } from "../entities/blogs"

const ssmClient = new SSMClient({ region: process.env.AWS_REGION })
const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION })

export const updateBlogsViewsCount = async () => {
    try {
        const getParameter = new GetParameterCommand({ Name: "GOOGLE_CREDENTIALS" })
        const { Parameter } = await ssmClient.send(getParameter)
        const credentialsString = Parameter?.Value as string
        const credentials = JSON.parse(credentialsString)
        const analyticsDataClient = new BetaAnalyticsDataClient({ credentials })

        const blogs: Blog[] = []

        const [response] = await analyticsDataClient.runReport({
            property: `properties/${process.env.GA4_PROPERTY_ID}`,
            dateRanges: [
                {
                    startDate: "2019-01-01",
                    endDate: "today",
                },
            ],
            dimensions: [
                {
                    name: "pagePath",
                },
            ],
            metrics: [
                {
                    name: "screenPageViews",
                },
            ],
            dimensionFilter: {
                filter: {
                    fieldName: "pagePath",
                    stringFilter: {
                        matchType: "BEGINS_WITH",
                        value: "/blog/",
                    },
                },
            },
        })

        if (!response.rows || !response.rowCount)
            return { blogs: [], error: "No data from Google Analytics." }

        for (let i = 0; i < response.rowCount; i++) {
            const row = response.rows[i]
            if (!row.dimensionValues || !row.metricValues) break
            if (!row.dimensionValues[0].value || !row.metricValues[0].value) break

            const blogObj = new Blog({
                slug: row.dimensionValues[0].value.replace("/blog/", ""),
                viewsCount: parseInt(row.metricValues[0].value),
            })

            const { blog } = await updateBlog({ blog: blogObj })
            blog && blogs.push(blog)
        }

        return { blogs }
    } catch (error) {
        console.log("Error updating blogs views count")
        console.log(error)
        const errorMessage = "Could not update blogs views count"

        return {
            error: errorMessage,
        }
    }
}

const updateBlog = async ({ blog }: { blog: Blog }) => {
    try {
        const command = new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: blog.key(),
            ConditionExpression: "attribute_exists(PK)",
            UpdateExpression: "SET #viewsCount = :viewsCount",
            ExpressionAttributeNames: {
                "#viewsCount": "ViewsCount",
            },
            ExpressionAttributeValues: {
                ":viewsCount": { N: blog.viewsCount.toString() },
            },
            ReturnValues: "ALL_NEW",
        })

        const response = await dynamodb.send(command)

        return {
            blog: blogFromItem(response.Attributes as BlogItem),
        }
    } catch (error) {
        console.log("Error updating blog")
        console.log(error)
        const errorMessage = "Could not update blog"

        return {
            error: errorMessage,
        }
    }
}
