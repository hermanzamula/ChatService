package db;

import db.API.DBSimpleOperationsTest;

class TestDatabasesSpeed {

    public static void main (String ... arg){
        TestDBFactory factory = new TestDBFactory();
        final DBSimpleOperationsTest testerMySql = factory.create(DBType.MYSQL);
        final DBSimpleOperationsTest testMongo = factory.create(DBType.MONGODB);

        System.out.println(testerMySql.getTestResult(10));
        System.out.println(testMongo.getTestResult(200000));
    }
}

