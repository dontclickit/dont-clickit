from algoliasearch import algoliasearch
import mysql
import mysql.connector


def main(): 
    client = algoliasearch.Client("CBJLT1KBQH","2ab19a08e4be64e5a5f55dd080c80f5d")
    indexName = "database2"
    #client.delete_index(indexName) #do not delete the index anymore
    index = client.init_index(indexName)

    #actors = [{"link":"www.lukeisanidiot.com", "reports":45},{"link":"www.bao=shiv.com","reports":45}]
    #index.add_objects(actors)


    
    #this is for having database as a parameter
    cnx = mysql.connector.connect(user="lptx42",password="i5pswich",host="myeusql.dur.ac.uk",database="Xlptx42_durhack")
    cursor = cnx.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reports")
    actors = list(cursor.fetchall())

    for i in range(len(actors)):
        currLink = actors[i]["link"]
        if(index.search(currLink)["hits"]):
            newReport = index.search(currLink)["hits"][0]["reports"] + actors[i]["reports"]
            print(newReport)
            objectID = index.search(currLink)["hits"][0]["objectID"]
            bigBatch = index.search(currLink)["hits"][0]["biggestbatch"]
            bigBatchSize = index.search(currLink)["hits"][0]["biggestbatchsize"]
            index.partial_update_object({"objectID": objectID, "reports":newReport})
            if(bigBatch < actors[i]["biggestbatch"]):
                index.partial_update_object({"objectID": objectID, "biggestbatch":actors[i]["biggestbatch"]})
            if(bigBatchSize < actors[i]["biggestbatchsize"]):
                index.partial_update_object({"objectID": objectID, "biggestbatchsize":actors[i]["biggestbatchsize"]})
        else:
            index.add_objects([actors[i]])

    cursor.close()
    cnx.close()

main()
    
        
            
        
        

    

    


