import { ChangeEvent, MouseEvent, useState } from "react";
import copy from "copy-to-clipboard";
import "./App.css";
import { Controles } from "./components/Controles";

function App() {
  const [state, setState] = useState<string>("");
  const [separador, setSeparador] = useState<string>("\\n");
  const [emails, setEmails] = useState<string>();
  const [phones, setPhones] = useState<string>();
  const [cheks, setCheks] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setState(value);
  };

  const handleExtrair = () => {
    if (cheks.includes("email")) {
      let emails = state.match(
        /([a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]+)/gi
      );

      if (emails) {
        const filtered = emails
          .map((email) => {
            const hasDot = email[email.length - 1] == ".";
            if (hasDot) {
              return email.substring(email.length - 1, 0);
            } else {
              return email;
            }
          })
          .filter((ele, pos, array) => array.indexOf(ele) == pos);

        if (separador !== "\\n") {
          setEmails(filtered.join(separador));
        } else {
          let str = "";
          filtered.forEach((el) => {
            const hasDot = el[el.length - 1] == ".";
            if (hasDot) {
              str += el.substring(el.length - 1, 0) + "\n";
            } else {
              str += el + "\n";
            }
          });

          setEmails(str);
        }
      }
    } else {
      setEmails("");
    }

    if (cheks.includes("phone")) {
      let phone = state
        .replaceAll(".", "")
        .match(
          /(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))/gm
        );

      if (phone) {
        const filtered = phone.filter(
          (ele, pos, array) => array.indexOf(ele) == pos
        );

        if (separador !== "\\n") {
          setPhones(filtered.join(separador));
        } else {
          let str = "";
          filtered.forEach((el) => {
            str += el + "\n";
          });

          setPhones(str);
        }
      }
    } else {
      setPhones("");
    }
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const aux = [...cheks];
    const hasField = cheks.indexOf(name);
    hasField < 0 ? aux.push(name) : aux.splice(hasField, 1);
    setCheks(aux);
  };

  const handleReset = () => {
    setPhones("");
    setEmails("");
    setCheks([]);
  };

  const handleSelect = (event: MouseEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSeparador(value);
  };

  return (
    <div className="App">
      <h2>Extrator de e-mails e telefones</h2>
      <div className="area">
        <div className="text-pasts">
          <textarea
            placeholder="Cole aqui o texto"
            onChange={({ target }) => handleChange(target.value)}></textarea>
        </div>
        <Controles
          cheks={cheks}
          handleCheck={handleCheck}
          handleSelect={handleSelect}
          separador={separador}
        />
      </div>
      <div className="actions">
        <button
          onClick={handleExtrair}
          disabled={cheks.length > 0 ? false : true}>
          extrair
        </button>

        <button onClick={handleReset}>Resetar</button>
      </div>

      <div className="list-group">
        {emails && (
          <div>
            <div className="label-copy">
              <label>Emails</label>
              <button onClick={() => copy(String(emails))}>copiar</button>
            </div>
            <textarea id="emails" value={emails} rows={10}></textarea>
          </div>
        )}

        {phones && (
          <div>
            <div className="label-copy">
              <label>Telefones</label>
              <button onClick={() => copy(String(phones))}>copiar</button>
            </div>
            <textarea id="emails" value={phones} rows={10}></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
