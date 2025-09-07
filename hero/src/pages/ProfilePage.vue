<script setup>
</script>

<template>
<section>
    <div class="geral"> <!--tambem so pro css-->

    <!-- div geral da class de perfil, nada a ser feito, apenas pro css -->
   <div class="perfil-user">
     <!-- div que deve aparecer de primeira -->
    <div class="perfil">
        <div>
            <p>
                perfil
            </p>
            <p>
                <!-- botao q faz mudar para a div de edição -->
                <button><font-awesome-icon :icon="['far', 'pen-to-square']" /></button>
            </p>
        </div>
        <div>
            <!-- img perfil -->
             <!-- nome user -->
              <!-- email user -->
               <!-- pontos -->
        </div>
        <div>
            <p><strong>Bio</strong></p>
            <!-- adicionar biografia caso nao tenha
             ou
             a biografia q a pessoa colou -->
        </div>
    </div>


    <!-- div que deve aparecer caso o botao de ediçao seja clicado -->
    <div class="perfil-edição">
        <div>
            <p>
                perfil
            </p>
            <p>
                <!-- botao q faz mudar para a div de inicio -->
                <button><font-awesome-icon :icon="['fas', 'xmark']" /></button>
            </p>
        </div>
        <div>
            <!-- img perfil -->
            
             <label for="nome">Nome</label>
             <input type="text">
              <!-- caixa para mudar o nome do usuario, dentro da caixa deve ter o nome original -->

              <label for="biografia">Bio</label>
             <input type="text">
               <!-- mesmo estilo da caixa do nome mas agora com a biografia -->
        </div>
        <div>
     </div>
    </div>
   </div>

<div class="conteudo-user"> <!--so css dnv-->

    <div class="user-bar">
        <!-- dentro das li's ta a tag p, mas pode mudar se precisar, pq elas vao servir como "liks", ai tu da uma olhada no figma pra entender melhor -->
        <ul>
            <li>
                <p>Estatísticas</p>
                <!-- se o user nao tiver nada, aparece 0 nos ngc -->
            </li>
            <li>
                <p>Comunidades</p>
                <!-- aqui se o user nao estiver em uma cominudade aparece Você ainda não está em uma comunidade. -->
            </li>
            <li>
                <p>Atividade</p>
                <!-- mesma coisa, mas ai aparece Você ainda não fez nenhuma postagem. -->
            </li>
        </ul>
    </div>

    <!-- agora, conforme o user clica em uma opção dos itens da lista, aparece uma div (no item da comunidades e atividades, segue o plano, se nao tiver nada aparece as mensagens dos comentarios acima) -->


    <!-- div das estatisticas -->
    <div>
        <div>
            <p>
                <!-- pontos do user -->
            </p>
            <p>
                Total de pontos
            </p>
        </div>
        <div>
            <p>
                <!-- numero de comunidades que o usuario esta -->
            </p>
            <p>
                Comunidades
            </p>
        </div>
        <div>
            <p>
                <!-- numero de postagens do usuario -->
            </p>
            <p>
                Postagens
            </p>
        </div>
        <div>
            <p>
                <!-- se conseguir fazer, total de pontos ganhos, contando ate os que ja foram gastos -->
            </p>
            <p>
                Pontos Ganhos
            </p>
        </div>
    </div>

    <!-- div das comunidades -->
     <div>
        <div> <!-- <---- div q deve aparecer para cada comunidade-->
            <!-- aqui tem q aparecer as comunidades q o usuario esta, nessa ordem
         
        nome da comunidade
        bio da comunidade
        quant de membros

        vai aparecer uma div para cada comunidade, dentro da div que guarda todas
     --> 
        </div>
        <div> <!--div para caso nao tenha comunidade, ainda dentro da principal-->
            <p>
               Você ainda não está em uma comunidade.
            </p>
        </div>
     </div>

     <!-- div para postagens -->
      <div>
        <div> <!-- <---- div q deve aparecer para cada postagem-->
            <!-- mesma coisa q na div de comunidades, mas com essas informaçoes
             
            oq foi escrito
            data da publicação
            numero de curtidas
            numero de comentarios-->
        </div>
        <div> <!--div para caso nao tenha postagem, ainda dentro da principal-->
            <p>
                Você ainda não fez nenhuma postagem.
            </p>
        </div>
      </div>

    </div>
</div>

<!--ta tudo bem cru de css e conteudo, mas é so coloca as info nos lugares certos de acordo com os comentarios e ir seguindo o figma q vai dar certo :) -->
</section>
</template>

<style scoped>
section {
    padding: 10vw;
}
.user-bar ul {
    display: flex;
    list-style: none;
}
.geral {
    display: flex;
}
</style>