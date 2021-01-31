import configparser

import mysql.connector

config = configparser.ConfigParser()
config.read('../../configuration.ini')
mysql_config = config['mysql']


def db_execute(sql: str):
    database = mysql.connector.connect(**mysql_config)
    cursor = database.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    database.close()
    return result
