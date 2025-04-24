import { MongoClient } from 'mongodb'

const dbName = 'marine-licensing-backend'
const collectionName = 'exemptions'

async function connectToMongoDb(uri) {
  const client = new MongoClient(uri)
  await client.connect()
  const database = client.db(dbName)
  const collection = database.collection(collectionName)
  return { client, collection }
}

export async function queryMongoDb(uri) {
  const { client, collection } = await connectToMongoDb(uri)
  try {
    const query = {}
    let results = []

    while (results.length === 0) {
      results = await collection.find(query).toArray()
      if (results.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
    return { success: true, data: results }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error occurred' }
  } finally {
    await client.close()
  }
}

export async function clearExemptionDataFromMongoDb(uri) {
  const { client, collection } = await connectToMongoDb(uri)
  try {
    await collection.deleteMany({})
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message || 'Unknown error occurred' }
  } finally {
    await client.close()
  }
}
