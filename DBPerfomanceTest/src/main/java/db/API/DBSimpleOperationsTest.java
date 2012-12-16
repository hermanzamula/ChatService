package db.API;


public interface DBSimpleOperationsTest {

    public static final String TEST_TABLE_NAME = "speed_test_credit";

    /**
     * @return  @return  String representation results of tests
     * @param numOfOperations  - number of operations need to perform
     */
    String getTestResult(long numOfOperations);
}
