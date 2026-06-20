function CisResultsTable({
    cisResults,
}) {
    return (
        <div
            style={{
                marginTop: "30px",
            }}
        >
            <h2>CIS Results</h2>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Check</th>
                        <th>Status</th>
                        <th>Evidence</th>
                    </tr>
                </thead>

                <tbody>
                    {cisResults.map(
                        (result, index) => (
                            <tr key={index}>
                                <td>
                                    {
                                        result.checkName
                                    }
                                </td>

                                <td>
                                    <span
                                        className={
                                            result.status === "PASS"
                                                ? "pass"
                                                : "fail"
                                        }
                                    >
                                        {result.status}
                                    </span>
                                </td>

                                <td>
                                    {
                                        result.evidence
                                    }
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CisResultsTable;