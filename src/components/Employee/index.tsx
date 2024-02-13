import { Employee } from "../../types";

type Props = {
  employee: Employee;
};

const EmployeeItem = ({ employee }: Props) => {
  return (
    <div>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
    </div>
  );
};

export default EmployeeItem;
