import * as React from "react";
import type { ChangeEvent } from "react";
import { InputField, Button } from "@admiral-ds/react-ui";
import { useAddUserMutation } from "../../../api/usersApi";
import "./style.css";

function UserActions() {
  const [addUser, { isLoading, isError }] = useAddUserMutation();

  const [localValue, setValue] = React.useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addUserHandler = async () => {
    if (localValue) {
      try {
        await addUser({ fio: localValue });
        setValue("");
      } catch (err) {
        console.error("Ошибка добавления пользователя:", err);
      }
    }
  };

  return (
    <div className="form">
      <InputField
        value={localValue}
        onChange={handleChange}
        label="ФИО"
        required
      />
      <Button
        appearance="primary"
        dimension="m"
        onClick={addUserHandler}
        disabled={!localValue}
        loading={isLoading}
      >
        Добавить
      </Button>
      {isError && <div>Ошибка добавления пользователя</div>}
    </div>
  );
}

export default UserActions;
