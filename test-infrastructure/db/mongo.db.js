import { MongoClient } from 'mongodb'

const dbName = 'marine-licensing-backend'
const collectionName = 'exemptions'

export async function queryMongoDb(uri) {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db(dbName)
    const collection = database.collection(collectionName)
    const query = {}

    let results = []
    while (results.length === 0) {
      results = await collection.find(query).toArray()
      if (results.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
    return results
  } catch (error) {
    // do something here?
  } finally {
    await client.close()
  }
}

export async function clearExemptionDataFromMongoDb(uri) {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db(dbName)
    const collection = database.collection(collectionName)
    await collection.deleteMany({})
  } catch (error) {
    // do something here?
  } finally {
    await client.close()
  }
}
