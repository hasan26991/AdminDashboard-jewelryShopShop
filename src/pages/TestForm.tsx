import { createFullForm } from "components/shared/FullForm/FullForm";

interface ITest {
  name: string;
  age: number;
}

const TestForm = () => {
  const { FullForm, TextInput } = createFullForm<ITest>();

  return (
    <FullForm>
      <TextInput id="name" label="Group Name" required />
    </FullForm>
  );
};

export default TestForm;
