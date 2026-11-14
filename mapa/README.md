# Mapa de Guerra · GAB · Guerra Civil Russa

Mapa interativo do Gabinete (GAB) da PEMUN para a simulação da Guerra Civil Russa (Vermelhos x Brancos).

## Como abrir

O mapa é um único arquivo, `index.html`. Basta abri-lo no navegador, ou publicar o repositório pelo GitHub Pages (Settings → Pages → Deploy from a branch → `main` / raiz).

## Modo local e modo sincronizado

- **Fora do Claude (este repositório, GitHub Pages, arquivo aberto no computador):** o mapa roda em **modo local**. O estado fica salvo só no navegador de quem abriu. Não há tempo real, senhas de gabinete nem envio de ordens. Para levar a partida a outro aparelho, use a "Cópia de segurança" na aba Boletim da Sala de Controle.
- **Dentro do Claude (artefato publicado):** o mapa sincroniza em tempo real, cifra os dados sigilosos com as senhas dos gabinetes e recebe as ordens de cada lado. A partida do comitê deve ser jogada por lá.

## O que há no mapa

- 25 regiões (agrupamentos de divisas administrativas reais), 5 cidades-chave e 6 zonas de água.
- 4 cenários: dezembro de 1917, agosto de 1918, março de 1919 e outubro de 1919.
- Exércitos com Força, Moral, Suprimento, etiquetas e general (patente, facção e traços).
- Flotilhas, combate naval e resolução de frentes com dados.
- Quatro visões: Projeção, Gabinete Vermelho, Gabinete Branco e Sala de Controle.

## Como modificar

Todo o código está dentro de `index.html`, no bloco `<script>`:

- `REGIOES`: nome, cidade, marcos, terreno, marcas e nota histórica de cada região.
- `ZONAS`: zonas de água e regiões ligadas.
- `CEN`: cenários (controle inicial, exércitos e flotilhas).
- `GENS` e `CGEN`: generais e sua distribuição por cenário.
- `TRACOS`: traços dos generais e seus efeitos.
- `calc()` e `aplicar()`: conta dos modificadores e aplicação do resultado.
- `GEO`: geometria das regiões, das bordas e do litoral (gerada a partir do Natural Earth; não editar à mão).

## Aviso

As regras numéricas e os efeitos dos traços estão no código e ficam visíveis a quem ler este repositório. Se o comitê quiser mantê-los reservados à diretoria, mantenha o repositório privado.

Dados geográficos: Natural Earth (domínio público).

## Arquivos

- `index.html`: o mapa pronto para uso, com código e geometria embutidos.
- `src/app.js`: o mesmo código, sem a geometria (o marcador `/*GEO*/null` é substituído pelo conteúdo gerado).
- `src/build-geo.js` e `src/ovr.json`: script que agrupa as divisas do Natural Earth nas 25 regiões. Só é necessário para redesenhar as regiões.
