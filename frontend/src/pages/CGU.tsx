import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useHalloween } from "../contexts/HalloweenContext";

const CGU: React.FC = () => {
  const { isHalloweenMode } = useHalloween();

  // Fonction pour transformer le texte avec emojis et couleurs alternées (mode Halloween)
  const transformText = (text: string) => {
    if (!isHalloweenMode) {
      // Mode normal : pas de transformation
      return text;
    }

    // Remplacer o par 🎃, i par 🕯️ et a par 👻
    const transformedText = text
      .replaceAll("o", "🎃")
      .replaceAll("O", "🎃")
      .replaceAll("i", "🕯️")
      .replaceAll("I", "🕯️")
      .replaceAll("a", "👻")
      .replaceAll("A", "👻");

    // Séparer en mots et alterner les couleurs
    const words = transformedText.split(" ");
    return words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        style={{ color: index % 2 === 0 ? "#9a00b9ff" : "#f54e00ff" }}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: { xs: 10, sm: 6 }, mb: 6, p: 2, backgroundColor: '#2C2C2C', color: '#FFFFFF' }}>
      <Typography variant="h3" align="center" gutterBottom>
        {transformText("Conditions Générales d'Utilisation")}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {transformText("Dernière mise à jour : 30 octobre 2025")}
      </Typography>

      <Paper sx={{ p: 3, mt: 3, maxHeight: "70vh", overflowY: "auto", backgroundColor: '#2C2C2C', color: '#FFFFFF' }}>
        <Typography variant="h5" gutterBottom>
          {transformText("1. Présentation du service")}
        </Typography>
        <Typography paragraph>
          {transformText("L'application BudJet est un outil de gestion budgétaire en ligne permettant aux utilisateurs de suivre leurs dépenses, gérer leurs budgets et visualiser leurs catégories de dépenses.")}
        </Typography>
        <Typography paragraph>
          {transformText("L'accès et l'utilisation du service impliquent l'acceptation pleine et entière des présentes Conditions Générales d'Utilisation (CGU).")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("2. Objet")}
        </Typography>
        <Typography paragraph>
          {transformText("Les présentes CGU ont pour objet de définir les modalités d'accès et d'utilisation de l'application BudJet par toute personne disposant d'un compte utilisateur.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("3. Accès au service")}
        </Typography>
        <Typography paragraph>
          {transformText("L'accès à BudJet est gratuit et nécessite la création d'un compte via un identifiant (pseudo) et un mot de passe. L'utilisateur est seul responsable du maintien de la confidentialité de ses identifiants.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("4. Fonctionnalités principales")}
        </Typography>
        <Typography paragraph>
          {transformText("L'application permet notamment de gérer des dépenses, des budgets et des catégories, et de visualiser des statistiques personnelles. BudJet se réserve le droit de modifier ses fonctionnalités sans préavis.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("5. Responsabilités de l'utilisateur")}
        </Typography>
        <Typography paragraph>
          {transformText("L'utilisateur s'engage à fournir des informations exactes, à ne pas utiliser l'application à des fins illégales et à respecter la confidentialité de ses données de connexion.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("6. Responsabilité de BudJet")}
        </Typography>
        <Typography paragraph>
          {transformText("BudJet ne saurait être tenu responsable des dommages indirects liés à l'utilisation du service, notamment en cas de perte de données ou d'erreurs de saisie.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("7. Données personnelles")}
        </Typography>
        <Typography paragraph>
          {transformText("Les données collectées sont traitées conformément à la Politique de confidentialité de BudJet. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données conformément au RGPD.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("8. Sécurité et authentification")}
        </Typography>
        <Typography paragraph>
          {transformText("Chaque connexion est protégée par un jeton unique. Ce jeton expire automatiquement pour garantir la sécurité du compte utilisateur.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("9. Propriété intellectuelle")}
        </Typography>
        <Typography paragraph>
          {transformText("Tous les éléments du service BudJet (code, logo, textes, design) sont protégés par le droit d'auteur. Toute reproduction est interdite sans autorisation.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("10. Modification des CGU")}
        </Typography>
        <Typography paragraph>
          {transformText("BudJet se réserve le droit de modifier à tout moment les présentes CGU. Toute modification sera notifiée à l'utilisateur via l'application.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("11. Résiliation")}
        </Typography>
        <Typography paragraph>
          {transformText("L'utilisateur peut supprimer son compte à tout moment. BudJet se réserve le droit de suspendre ou résilier un compte en cas de non-respect des présentes conditions.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("12. Droit applicable")}
        </Typography>
        <Typography paragraph>
          {transformText("Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.")}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {transformText("13. Contact")}
        </Typography>
        <Typography paragraph>
          {transformText("Pour toute question, l'utilisateur peut contacter l'équipe BudJet à l'adresse : contact@budjet.app")}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CGU;
