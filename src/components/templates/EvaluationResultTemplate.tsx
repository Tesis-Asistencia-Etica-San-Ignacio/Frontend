import { EvaluationHeader } from "../organisms/Evaluation-header"
// import { TextArea } from "../atoms/ui/text-area"
import { Button } from "../atoms/ui/button"
import tasks from "../screens/dataForTableExample/tasks.json"
import { columns } from "../molecules/table/Columns"
import { DataTable } from "../organisms/Data-table"

    export default function EvaluationResultTemplate () {
        return (
            <div>
                <EvaluationHeader />
                {/* <TextArea /> */}
                <DataTable data={tasks} columns={columns} />
                <Button>Enviar</Button>
            </div>
        )
    }