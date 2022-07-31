import React, { ChangeEvent, MouseEvent } from "react";

interface IControlesProps {
  handleSelect: (event: MouseEvent<HTMLInputElement>) => void;
  handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  cheks: string[];
  separador: string;
}

const separators = [
  { label: "Vírgula ( , )", value: ",", id: "virgula" },
  { label: "Ponto ( . )", value: ".", id: "ponto" },
  { label: "Ponto e Vírgula ( ; )", value: ";", id: "ponto_virgula" },
  { label: "Dois Pontos ( : )", value: ":", id: "dois_pontos" },
  { label: "Barra ( / )", value: "/", id: "barra" },
  { label: "Quebra Linha ( \\n )", value: "\\n", id: "quebra_linha" },
];

export const Controles: React.FC<IControlesProps> = ({
  handleSelect,
  handleCheck,
  cheks,
  separador,
}) => {
  return (
    <div className="controles">
      <span>Separador</span>
      <div className="controles-separador">
        {separators.map((separator, index) => {
          return (
            <label htmlFor={separator.id} key={index} id="radio">
              <input
                type="radio"
                name="radio"
                id={separator.id}
                value={separator.value}
                checked={separator.value == separador ? true : false}
                onClick={handleSelect}
              />
              {separator.label}
            </label>
          );
        })}
      </div>

      <span>Extrair</span>
      <div className="controles-separador">
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
  );
};
