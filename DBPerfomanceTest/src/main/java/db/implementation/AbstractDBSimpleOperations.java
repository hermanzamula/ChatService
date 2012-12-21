package db.implementation;


import db.API.DBSimpleOperationsTest;

public abstract class AbstractDBSimpleOperations implements DBSimpleOperationsTest {

    protected abstract void createTestTable() throws Exception;
    protected abstract long insert(long operationNum) throws Exception;
    protected abstract long update(long operationNum) throws Exception;
    protected abstract long delete(long operationNum) throws Exception;
    protected abstract long select() throws Exception;

    @Override
    public String getTestResult(long numOfOperations) {

        try {
            createTestTable();
            long insert = insert(numOfOperations);
            long update = update(numOfOperations);
            long select = select();
            long delete = delete(numOfOperations);
            return this.getClass()+":Insert time, ms: " + insert +
                    "; update time, ms: " + update +
                    "; delete time, ms: " + delete + ";" +
                    " select time, ms: "  + select +
                    "\n number of operations for each statement: " + numOfOperations +". ";

        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
