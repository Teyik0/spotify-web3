# Spotify Web3 Like avec IPFS, Filecoin et NFTs

Ce projet est une application web décentralisée inspirée de Spotify, qui utilise la technologie blockchain pour stocker et gérer de la musique. L'application utilise IPFS pour stocker les fichiers audio, avec la surcouche de Filecoin web3.storage pour assurer la redondance et la disponibilité des données.

## Caractéristiques

- Stockage décentralisé de musique sur IPFS avec web3.storage
- Création d'un NFT pour chaque musique avec les métadonnées nécessaires
- Copie des métadonnées stockée sur une base de données PostgreSQL
- Interface utilisateur réactive et moderne construite avec Next.js, Bun, Tailwind CSS, Shadcn UI, Wagmi et Viem
- Backend construit avec Express.js, Bun et Prisma
- Smart contracts ERC-721 pour les NFTs, déployés avec Hardhat et Viem
- Utilisation de TypeScript pour la sécurité de type dans tous les projets
- Dockerfiles pour le frontend et le backend pour faciliter le déploiement avec Docker Compose

## Structure du projet

Le projet est divisé en trois dossiers principaux :

- `front` : le frontend de l'application, construit avec Next.js, Bun, Tailwind CSS, Shadcn UI, Wagmi et Viem.
- `back` : le backend de l'application, construit avec Express.js, Bun et Prisma.
- `smart-contract` : les smart contracts ERC-721 pour les NFTs, déployés avec Hardhat et Viem.

Chacun de ces dossiers contient son propre fichier `package.json` avec ses dépendances respectives.

## Quick Start

Pour installer et exécuter le projet localement, suivez les étapes suivantes :

1. Clonez le dépôt Git :

```bash
git clone https://github.com/Teyik0/spotify-web3.git
```

2. Accédez au répertoire racine du projet :

```bash
cd spotify-web3
```

3. Créez un fichier .env.local dans le dossier front avec les variables d'environnement suivantes :

```bash
BACK_URL=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

4. Créez un fichier .env dans le dossier back avec les variables d'environnement suivantes :

```bash
DATABASE_URL=
```

5. Construisez et exécutez le projet avec Docker Compose :

```bash
docker-compose up
```

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer au projet, veuillez ouvrir une pull request avec vos modifications.

## License

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.
