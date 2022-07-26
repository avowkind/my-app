import clientPromise from '../../lib/mongodb'
const row = 
{ 
  "_id": "SNA-20130911-E-1/T3",
  "date": "2012-02-26",
  "entered_by": 'CFNBXC', 
  "batch":"SNA-20130911-E-1",
  "date_brood_start":"2012-02-26",
  "date_brood_complete": "",
  "date_brood_removed": "",
  "date_offspring_spawned_start": "",	
  "date_offspring_spawned_end": "",
  "origin_parents_wild_breed": "Wild",
  "source_population_or_wild": "Wild",
  "parent_indicator": "A",
  "class": "Wild Old",
  "batch_new": 'SNA-20130911-E-1',
  "batch_previous_1": "",
  "batch_previous_2": "",
  "change_reason_1": 'New wild fish added": weigh, length',
  "change_reason_2": "",
  "tank_from_1": "",
  "tank_from_2": "",
  "tank_to": "T3",
}



const defaultBatchcodes = [
{ _id:"SNA-20130911-E-1" },
{ _id:"SNA-20130911-E-2" },
{ _id:"SNA-20130911-E-3" },
{ _id:"SNA-20130911-E-4" },
{ _id:"TRE-20120226-A-1" },
{ _id:"TRE-20180529-H-1" },
{ _id:"TRE-20180529-I-1" },
{ _id:"TRE-20180703-B-1" },
{ _id:"TRE-20180703-C-1" },
{ _id:"TRE-20180529-D-1" },
{ _id:"TRE-20180730-E-1" },
{ _id:"TRE-20180730-F-1" },
{ _id:"TRE-20180529-G-1" },
{ _id:"TRE-20180529-J-1" },
{ _id:"TRE-20180529-K-1" },
{ _id:"TRE-20180529-L-1" },
{ _id:"TRE-20180529-M-1" },
{ _id:"TRE-20180529-N-1" },
{ _id:"TRE-20180529-O-1" },
{ _id:"TRE-20180529-P-1" },
{ _id:"TRE-20180529-Q-1" },
{ _id:"TRE-20180529-R-1" },
{ _id:"TRE-20120226-S-1" },
{ _id:"TRE-20120226-T-1" },
{ _id:"TRE-20120226-U-1" },
{ _id:"TRE-20120226-W-1" },
{ _id:"YBF-20150529-A-1" },
{ _id:"YBF-20151020-B-1" },
{ _id:"YBF-20151020-C-1" },
{ _id:"YBF-20151020-D-1" },
{ _id:"YBF-20151112-E-1" },
{ _id:"YBF-20150529-F-1" },
{ _id:"YBF-20151126-G-1" },
{ _id:"YBF-20160603-H-1" },
{ _id:"YBF-20160618-I-1" },
{ _id:"YBF-20150529-J-1" },
{ _id:"YBF-20151020-K-1" },
{ _id:"YBF-20160718-L-1" },
{ _id:"YBF-20160719-M-1" },
{ _id:"YBF-20160719-N-1" },
{ _id:"YBF-20151020-O-1" },
{ _id:"YBF-20160618-Q-1" },
{ _id:"YBF-20160618-Q-2" },
]

export default async function handler (req, res) {
  const dbname = process.env.MONGODB_DB

  try {
    if (req.method === 'GET') {
      const client = await clientPromise
      const batchcodes = client.db(dbname).collection('batchcodes')
      let batchcodesResult = await batchcodes.find().toArray()
      if (batchcodesResult.length === 0) {
        await batchcodes.insertMany(defaultBatchcodes)
        batchcodesResult = await batchcodes.find().toArray()
      }
      res.status(200).json( batchcodesResult )

    } else {
      // Handle any other HTTP method
    }

  } catch (e) {
    console.error(e)
    res.status(500).json(e)
  }
}
