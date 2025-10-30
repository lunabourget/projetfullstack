import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const CGU: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6, mb: 6, p: 2 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Conditions Générales d’Utilisation
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Dernière mise à jour : 30 octobre 2025
      </Typography>

      <Paper sx={{ p: 3, mt: 3, maxHeight: "70vh", overflowY: "auto" }}>
        <Typography variant="h5" gutterBottom>
          1. Présentation du service
        </Typography>
        <Typography paragraph>
          L’application <strong>BudJet</strong> est un outil de gestion budgétaire en ligne
          permettant aux utilisateurs de suivre leurs dépenses, gérer leurs budgets et
          visualiser leurs catégories de dépenses.
        </Typography>
        <Typography paragraph>
          L’accès et l’utilisation du service impliquent l’acceptation pleine et entière des
          présentes Conditions Générales d’Utilisation (CGU).
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Objet
        </Typography>
        <Typography paragraph>
          Les présentes CGU ont pour objet de définir les modalités d’accès et d’utilisation
          de l’application BudJet par toute personne disposant d’un compte utilisateur.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Accès au service
        </Typography>
        <Typography paragraph>
          L’accès à BudJet est gratuit et nécessite la création d’un compte via un identifiant
          (pseudo) et un mot de passe. L’utilisateur est seul responsable du maintien de la
          confidentialité de ses identifiants.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Fonctionnalités principales
        </Typography>
        <Typography paragraph>
          L’application permet notamment de gérer des dépenses, des budgets et des catégories,
          et de visualiser des statistiques personnelles. BudJet se réserve le droit de
          modifier ses fonctionnalités sans préavis.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Responsabilités de l’utilisateur
        </Typography>
        <Typography paragraph>
          L’utilisateur s’engage à fournir des informations exactes, à ne pas utiliser
          l’application à des fins illégales et à respecter la confidentialité de ses données
          de connexion.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Responsabilité de BudJet
        </Typography>
        <Typography paragraph>
          BudJet ne saurait être tenu responsable des dommages indirects liés à l’utilisation
          du service, notamment en cas de perte de données ou d’erreurs de saisie.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Données personnelles
        </Typography>
        <Typography paragraph>
          Les données collectées sont traitées conformément à la Politique de confidentialité
          de BudJet. L’utilisateur dispose d’un droit d’accès, de rectification et de
          suppression de ses données conformément au RGPD.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Sécurité et authentification
        </Typography>
        <Typography paragraph>
          Chaque connexion est protégée par un jeton unique. Ce jeton expire automatiquement
          pour garantir la sécurité du compte utilisateur.
        </Typography>

        <Typography variant="h5" gutterBottom>
          9. Propriété intellectuelle
        </Typography>
        <Typography paragraph>
          Tous les éléments du service BudJet (code, logo, textes, design) sont protégés par
          le droit d’auteur. Toute reproduction est interdite sans autorisation.
        </Typography>

        <Typography variant="h5" gutterBottom>
          10. Modification des CGU
        </Typography>
        <Typography paragraph>
          BudJet se réserve le droit de modifier à tout moment les présentes CGU. Toute
          modification sera notifiée à l’utilisateur via l’application.
        </Typography>

        <Typography variant="h5" gutterBottom>
          11. Résiliation
        </Typography>
        <Typography paragraph>
          L’utilisateur peut supprimer son compte à tout moment. BudJet se réserve le droit de
          suspendre ou résilier un compte en cas de non-respect des présentes conditions.
        </Typography>

        <Typography variant="h5" gutterBottom>
          12. Droit applicable
        </Typography>
        <Typography paragraph>
          Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux
          français seront seuls compétents.
        </Typography>

        <Typography variant="h5" gutterBottom>
          13. Contact
        </Typography>
        <Typography paragraph>
          Pour toute question, l’utilisateur peut contacter l’équipe BudJet à l’adresse :{" "}
          <strong>contact@budjet.app</strong>
        </Typography>
      </Paper>
    </Box>
  );
};

export default CGU;
