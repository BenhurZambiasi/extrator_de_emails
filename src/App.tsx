import { ChangeEvent, MouseEvent, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState<string>("");
  const [separador, setSeparador] = useState<string>("");
  const [emails, setEmails] = useState<string>();
  const [phones, setPhones] = useState<RegExpMatchArray | null>();
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
        let filtered = emails.filter(
          (ele, pos, array) => array.indexOf(ele) == pos
        );

        if (separador !== "\\n") {
          setEmails(filtered.join(separador));
        } else {
          let str = "";
          filtered.forEach((el) => {
            str += el + "\n";
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
      setPhones(phone);
    } else {
      setPhones([]);
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
    setPhones([]);
    setEmails("");
    setCheks([]);
  };

  const haddleSeparators = (value: string) => {
    let teste = value.match(/\W|_/);
    if (teste) {
      setSeparador(teste[0]);
    } else {
      setSeparador("");
    }
  };

  const handleSelect = (event: MouseEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSeparador(value);
    console.log(value);
  };

  return (
    <div className="App">
      <h2>App de extração de e-mails e telefones</h2>
      <div className="area">
        <textarea
          placeholder="Cole aqui o texto"
          onChange={({ target }) => handleChange(target.value)}></textarea>
        <div>
          <span>Separador</span>
          <label htmlFor="ra">
            <input
              type="radio"
              name="radio"
              id="ra"
              value=","
              onClick={handleSelect}
            />
            Vírgula ( , )
          </label>
          <label htmlFor="pontoV">
            <input
              type="radio"
              name="radio"
              id="pontoV"
              value=";"
              onClick={handleSelect}
            />
            Ponto e Vírgula ( ; )
          </label>
          <label htmlFor="ponto">
            <input
              type="radio"
              name="radio"
              id="ponto"
              value="."
              onClick={handleSelect}
            />
            Ponto ( . )
          </label>
          <label htmlFor="barra">
            <input
              type="radio"
              name="radio"
              id="barra"
              value="/"
              onClick={handleSelect}
            />
            Barra ( / )
          </label>
          <label htmlFor="dpontos">
            <input
              type="radio"
              name="radio"
              id="dpontos"
              value=":"
              onClick={handleSelect}
            />
            Dois Pontos ( : )
          </label>
          <label htmlFor="qLinh">
            <input
              type="radio"
              name="radio"
              id="qLinh"
              value="\n"
              onClick={handleSelect}
            />
            Quebrar Linha
          </label>
          {/* <select
            name=""
            id=""
            value={separador}
            onClick={handleSelect}>
            <option value=";">ponto e vírgula</option>
            <option value=",">vírgula</option>
            <option value=".">ponto</option>
            <option value="/">barra</option>
            <option value="\n">Quebrar linha</option>
          </select> */}
          <span>Extrair</span>
          <label htmlFor="email">
            <input
              type="checkbox"
              name="email"
              id="email"
              onChange={handleCheck}
              checked={cheks.includes("email")}
            />
            E-mail
          </label>
          <label htmlFor="phone">
            <input
              type="checkbox"
              name="phone"
              id="phone"
              onChange={handleCheck}
              checked={cheks.includes("phone")}
            />
            Telefone
          </label>
        </div>
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
            <label htmlFor="">Emails</label>

            <textarea name="" id="" value={emails} placeholder=""></textarea>
            {/* <ul>
              {emails.map((el, index) => {
                return <li key={index}>{el.toLowerCase()}</li>;
              })}
            </ul> */}
          </div>
        )}

        {phones && phones.length > 0 && (
          <div>
            <label htmlFor="">Telefones</label>
            <ul>
              {phones.map((el, index) => {
                return <li key={index}>{el}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
