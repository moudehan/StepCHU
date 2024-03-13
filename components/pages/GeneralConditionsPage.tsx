import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface GeneralConditionsPageProps {
  navigation: any;
}
export default function GeneralConditionsPage({
  navigation,
}: GeneralConditionsPageProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramBack
        paramIcon={false}
        title="Conditions générales d’utilisation"
        navigation={navigation}
      />

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>ARTICLE 1 : Objet</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Les présentes « conditions générales d'utilisation » ont pour objet
            l'encadrement juridique de l’utilisation de l’application CHU Rouen
            et de ses services. Ce contrat est conclu entre : Le gérant du site
            internet, ci-après désigné « l’Éditeur », Toute personne physique ou
            morale souhaitant accéder au site et à ses services, ci-après appelé
            « l’Utilisateur ». Les conditions générales d'utilisation doivent
            être acceptées par tout Utilisateur, et son accès au site vaut
            acceptation de ces conditions.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>ARTICLE 2 : Mentions légales</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Pour les personnes morales : L’application STEP CHU est édité par la
            société CHU ROUEN.
          </Text>
        </View>
        <View style={styles.headerContainer2}>
          <Text style={styles.title}>
            ARTICLE 4 : Responsabilité de l’Utilisateur
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            L'Utilisateur est responsable des risques liés à l’utilisation de
            son identifiant de connexion et de son mot de passe. Le mot de passe
            de l’Utilisateur doit rester secret. En cas de divulgation de mot de
            passe, l’Éditeur décline toute responsabilité. L’Utilisateur assume
            l’entière responsabilité de l’utilisation qu’il fait des
            informations et contenus présents sur l’application STEP CHU. Tout
            usage du service par l'Utilisateur ayant directement ou
            indirectement pour conséquence des dommages doit faire l'objet d'une
            indemnisation au profit du site. Le membre s’engage à tenir des
            propos respectueux des autres et de la loi et accepte que ces
            publications soient modérées ou refusées par l’Éditeur, sans
            obligation de justification. En publiant sur le site, l’Utilisateur
            cède à la société éditrice le droit non exclusif et gratuit de
            représenter, reproduire, adapter, modifier, diffuser et distribuer
            sa publication, directement ou par un tiers autorisé. L’Éditeur
            s'engage toutefois à citer le membre en cas d’utilisation de sa
            publication
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>
            ARTICLE 5 : Responsabilité de l’Éditeur
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Tout dysfonctionnement du serveur ou du réseau ne peut engager la
            responsabilité de l’Éditeur.{"\n"} De même, la responsabilité du
            site ne peut être engagée en cas de force majeure ou du fait
            imprévisible et insurmontable d'un tiers.{"\n"}L’application STEP
            CHU s'engage à mettre en œuvre tous les moyens nécessaires pour
            garantir la sécurité et la confidentialité des données. Toutefois,
            il n’apporte pas une garantie de sécurité totale.{"\n"}L’Éditeur se
            réserve la faculté d’une non-garantie de la fiabilité des sources,
            bien que les informations diffusées sur le site soient réputées
            fiables.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>ARTICLE 6 : Propriété intellectuelle</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Les contenus de l’application STEP CHUR (logos, textes, éléments
            graphiques, vidéos, etc.) sont protégés par le droit d’auteur, en
            vertu du Code de la propriété intellectuelle.{"\n"}L'utilisateur
            devra obtenir l’autorisation de l’éditeur du site avant toute
            reproduction, copie ou publication de ces différents contenus. Ces
            derniers peuvent être utilisés par les utilisateurs à des fins
            privées ; tout usage commercial est interdit.{"\n"}L'utilisateur est
            entièrement responsable de tout contenu qu’il met en ligne et il
            s’engage à ne pas porter atteinte à un tiers.{"\n"}L’Éditeur du site
            se réserve le droit de modérer ou de supprimer librement et à tout
            moment les contenus mis en ligne par les utilisateurs, et ce sans
            justification.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>ARTICLE 7 : Données personnelles</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            L’Utilisateur doit obligatoirement fournir des informations
            personnelles pour procéder à son inscription sur le site. L’adresse
            électronique (e-mail) de l’utilisateur pourra notamment être
            utilisée par l’application STEP CHU pour la communication
            d’informations diverses et la gestion du compte. [Votre site]
            garantit le respect de la vie privée de l’utilisateur, conformément
            à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux
            fichiers et aux libertés. En vertu des articles 39 et 40 de la loi
            en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès,
            de rectification, de suppression et d'opposition de ses données
            personnelles. L'Utilisateur exerce ce droit via :{"\n"}
            {"\n"}• Son espace personnel sur le site.{"\n"}• Un formulaire de
            contact.{"\n"}• Par mail à mail.{"\n"}• Par voie postale au CHU
            ROUEN.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>ARTICLE 8 : Liens hypertextes</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Les domaines vers lesquels mènent les liens hypertextes présents sur
            le site n’engagent pas la responsabilité de l’Éditeur de STEP CHU,
            qui n’a pas de contrôle sur ces liens.{"\n"}
            {"\n"} Il est possible pour un tiers de créer un lien vers une page
            du site STEP CHU sans autorisation expresse de l’éditeur.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>
            ARTICLE 9 : Évolution des conditions générales d’utilisation
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            L’application STEP CHU se réserve le droit de modifier les clauses
            de ces conditions générales d’utilisation à tout moment et sans
            justification.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>ARTICLE 10 : Durée du contrat</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            La durée du présent contrat est indéterminée. Le contrat produit ses
            effets à l'égard de l'utilisateur à compter du début de
            l’utilisation du service
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Text style={styles.title}>
            ARTICLE 11 : Droit applicable et juridiction compétente
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Le présent contrat dépend de la législation française. En cas de
            litige non résolu à l’amiable entre l'utilisateur et l’éditeur, les
            tribunaux de ROUEN sont compétents pour régler le contentieux
          </Text>
        </View>
      </ScrollView>

      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 110,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  headerContainer1: {
    flexDirection: "row",
    marginTop: 40,
  },
  headerContainer2: {
    flexDirection: "row",
    marginTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#363F5E",
    marginLeft: 10,
  },
  textContainer: {
    marginTop: 5,
  },
  bodyText: {
    fontSize: 16,
    color: "#363F5E",
    textAlign: "justify",
  },
});
