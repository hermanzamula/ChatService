package db;

import db.API.DBSimpleOperationsTest;
import db.implementation.MongoDBSimpleOperationsTest;
import db.implementation.MySqlSimpleOperationsTest;

import java.util.HashMap;
import java.util.Map;

public class TestDBFactory {

    private static final Map<DBType, DBSimpleOperationsTest> DB_MAP = new HashMap<DBType, DBSimpleOperationsTest>() {{
        put(DBType.MYSQL, new MySqlSimpleOperationsTest("mydb"));
        put(DBType.MONGODB, new MongoDBSimpleOperationsTest("mongotest"));
    }};

    public  DBSimpleOperationsTest create(DBType dbType){
        return DB_MAP.get(dbType);
    }
}
