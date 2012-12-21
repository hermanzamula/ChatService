package db.implementation;

import com.mongodb.*;
import org.apache.log4j.Logger;

import java.net.UnknownHostException;
import java.sql.SQLException;
import java.util.Date;


public class MongoDBSimpleOperationsTest extends AbstractDBSimpleOperations {

    private static final Logger LOGGER = Logger.getLogger(MongoDBSimpleOperationsTest.class);
    public static final String HOST_PATH = "localhost";
    private DB mongoDB;

    @Override
    protected long select() throws Exception {
        Date date = new Date();
        final DBCursor cursor = mongoDB.getCollection(TEST_TABLE_NAME).find();
        //System.out.println(cursor.toArray());
        return new Date().getTime() - date.getTime();
    }

    private DBCollection collection;

    @Override
    protected void createTestTable() throws Exception {
        collection = mongoDB.getCollection(TEST_TABLE_NAME);
    }

    public MongoDBSimpleOperationsTest(final String dbName) {
        try {
            Mongo client = new Mongo(HOST_PATH);
            mongoDB = client.getDB(dbName);
        } catch (UnknownHostException e) {
            LOGGER.debug(e.getMessage());
        }
    }

    @Override
    protected long insert(long operationNum) throws SQLException {
        final Date date = new Date();

        for (int i = 0; i < operationNum; i++) {
            collection.insert(new BasicDBObject().append("client", new BasicDBObject().append("UID", i)
                    .append("FLM", "name" + i).append("gender", "gender" + i).append("passportData", "data" + i).append("familyStatus", "family" + i)
                    .append("work", "work" + i)).append("BankInfo", new BasicDBObject().append("MFO", "mfo" + i)
                    .append("name", "name" + i).append("form", "form" + i).append("fio", "fio" + i)).append("ClientDealDetail",
                    new BasicDBObject().append("reference", "refernce" + i).append("type", "type" + i).append("dateStart", "datestart" + i)
                            .append("DateEnd", "dateend" + i).append("allAmount", "allamout" + i)));
        }
        return new Date().getTime() - date.getTime();
    }

    @Override
    protected long update(long operationNum) throws SQLException {
        final Date date = new Date();

        for (int i = 0; i < operationNum; i++) {
            collection.update(new BasicDBObject("client", new BasicDBObject("UID", i)),
     new BasicDBObject("client", new BasicDBObject("UID", operationNum - i)));
        }
        return new Date().getTime() - date.getTime();
    }

    @Override
    protected long delete(long operationNum) throws SQLException {
        final Date date = new Date();
        collection.remove(new BasicDBObject());
        return new Date().getTime() - date.getTime();
    }
}
