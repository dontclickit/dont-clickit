from algoliasearch import algoliasearch
import mysql
import mysql.connector


def main(): 
    client = algoliasearch.Client("CBJLT1KBQH","2ab19a08e4be64e5a5f55dd080c80f5d")
    indexName = "database"
    client.delete_index(indexName)
    index = client.init_index(indexName)

    #actors = [{"link":"www.lukeisanidiot.com", "reports":45},{"link":"www.bao=shiv.com","reports":45}]
    #index.add_objects(actors)


    
    #this is for having database as a parameter
    cnx = mysql.connector.connect(user="lptx42",password="i5pswich",host="myeusql.dur.ac.uk",database="Xlptx42_durhack")
    cursor = cnx.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reports")
    actors = list(cursor.fetchall())

    index.add_objects(actors)

    cursor.close()
    cnx.close()
    

    


