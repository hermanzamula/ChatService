package db;

import db.API.DBSimpleOperationsTest;

class TestDatabasesSpeed {

    public static void main (String ... arg){
        TestDBFactory factory = new TestDBFactory();
        final DBSimpleOperationsTest testerMySql = factory.create(DBType.MYSQL);
        final DBSimpleOperationsTest testMongo = factory.create(DBType.MONGODB);

        System.out.println(testerMySql.getTestResult(100));
        System.out.println(testMongo.getTestResult(100));
        System.out.println(testMongo.getTestResult(1000));
        System.out.println(testMongo.getTestResult(10000));
        System.out.println(testMongo.getTestResult(50000));
        System.out.println(testMongo.getTestResult(100000));
        System.out.println(testMongo.getTestResult(200000));
        System.out.println(testMongo.getTestResult(500000));
    }
}

