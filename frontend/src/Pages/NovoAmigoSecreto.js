import ResponsiveAppBar from "../Components/Menu"
import React from "react";
import CadastroSorteio from "../Components/CadastroSorteio";

const NovoAmigoSecreto = () => {
  return (
    <div>
      <ResponsiveAppBar/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5% 0' }}>
        <CadastroSorteio />
      </div>
    </div>
  );
}

export default NovoAmigoSecreto;