import mysql.connector
from pathlib import Path

DATABASE_NAME = "Rudimentary_Steam_DB"
BACKEND_DIR = Path(__file__).resolve().parents[1]

def main():
    print("Hit Enter to use default values for MySQL connection parameters.")
    host = input("Enter MySQL host (Default: localhost): ") or "localhost"
    port = input("Enter MySQL port (Default: 3306): ") or "3306"
    user = input("Enter MySQL username (Default: root): ") or "root"
    password = input("Enter MySQL password (Default: None): ") or ""
    wipe_database = input("Do you want to wipe the existing database? (y/n): ").lower() == 'y'

    if wipe_database:
        delete_database(host, port, user, password)

    create_database(host, port, user, password)

def execute_sql_file(filename, connection):
    cursor = connection.cursor()
    
    with open(filename, 'r') as f:
        sql_commands = f.read().split(';')

    for command in sql_commands:
        try:
            if command.strip():
                cursor.execute(command)
        except mysql.connector.Error as err:
            print(f"Skipped command due to error: {err}")

    connection.commit()
    cursor.close()

def delete_database(host, port, user, password):
    mydb = None
    cursor = None
    try:
        mydb = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            port=int(port)
        )

        cursor = mydb.cursor()

        cursor.execute(f"DROP DATABASE IF EXISTS {DATABASE_NAME}")

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if cursor is not None:
            cursor.close()
        if mydb is not None:
            mydb.close()

def create_database(host, port, user, password):
    mydb = None
    cursor = None
    try:
        mydb = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            port=int(port)
        )

        cursor = mydb.cursor()

        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DATABASE_NAME}")

        cursor.execute(f"USE {DATABASE_NAME}")
        
        execute_sql_file(BACKEND_DIR / 'sql' / 'createTables.sql', mydb)

    except mysql.connector.Error as err:
        print(f"Error: {err}")

    finally:
        if cursor is not None:
            cursor.close()
        if mydb is not None:
            mydb.close()

if __name__ == "__main__":
    main()
