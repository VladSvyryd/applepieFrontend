import gql from "graphql-tag";

const fragments = {
  link: gql`
    fragment Link on ComponentLinksLink {
      name
      url
      image {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      image_alternative {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      name_en
      url_en
      image_en {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      image_alternative_en {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  button_en: gql`
    fragment Button_EN on ComponentButtonsButton {
      id
      text_en
      subtext_en
      function_en
    }
  `,
  button_de: gql`
    fragment Button_DE on ComponentButtonsButton {
      id
      text
      subtext
      function
    }
  `,
  card_en: gql`
    fragment Card_EN on ComponentSectionsCard {
      title: title_en
      subtitle: subtitle_en
      image: image_en {
        id
      }
    }
  `,
  card_de: gql`
    fragment Card_DE on ComponentSectionsCard {
      title
      subtitle
      image {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  imageGrid_en: gql`
    fragment ImageGrid_EN on ComponentSectionsImagesGrid {
      title_en
      images_en {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  imageGrid_de: gql`
    fragment ImageGrid_DE on ComponentSectionsImagesGrid {
      title
      images {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  pagination: gql`
    fragment Pagination on ComponentTypesPagination {
      id
      title
      icons {
        id
        name
        alternative_name
        alternative_text
        alternative_text_alternative
        image {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        image_alternative {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
      }
      background {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      background_alternative {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  review: gql`
    fragment Review on Review {
      avatar {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      name
      content_text
      subtitle
      title
      position
    }
  `,
  icon: gql`
    fragment Icon on ComponentTypesImage {
      id
      name
      alternative_name
      alternative_text
      alternative_text_alternative
      image {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      image_alternative {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
    }
  `,
  address_de: gql`
    fragment Address_DE on ComponentTypesAddress {
      title
      street
      city
      t_number
      content
      day
      time_from
      time_till
    }
  `,
  address_en: gql`
    fragment Address_EN on ComponentTypesAddress {
      title: title_en
      street: street_en
      city: city_en
      t_number: t_number
      content: content_en
      day: day_en
      time_from: time_from_en
      time_till: time_till_en
    }
  `,
};
export const landing_de = gql`
  query {
    homeDe {
      intro {
        title: title
        description: description
        pictures {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        logo {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
      }
      known_by_title
      social_links {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      known_by {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      buttons {
        ... on ComponentButtonsButton {
          ...Button_DE
        }
      }
      services {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      first_section {
        title
        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      second_section {
        title

        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      third_section {
        ... on ComponentSectionsImagesGrid {
          ...ImageGrid_DE
        }
      }
      pagination {
        ... on ComponentTypesPagination {
          ...Pagination
        }
      }
      forth_section {
        title
        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        content_text
        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      fifth_section {
        title

        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      sixth_section {
        title

        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      seventh_section {
        title
        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        content_text
        cards {
          ... on ComponentSectionsCard {
            ...Card_DE
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      contact: impressum {
        __typename
        ... on ComponentTypesAddress {
          ...Address_DE
        }
      }
      reviews {
        ... on Review {
          ...Review
        }
      }
    }
  }

  ${fragments.link}
  ${fragments.button_de}
  ${fragments.card_de}
  ${fragments.imageGrid_de}
  ${fragments.pagination}
  ${fragments.review}
  ${fragments.address_de}
`;
export const landing_en = gql`
  query {
    homeDe {
      intro {
        title: title_en
        description: description_en
        pictures: pictures_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        logo {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
      }
      known_by_title
      social_links {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      known_by {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      buttons {
        ... on ComponentButtonsButton {
          ...Button_DE
        }
      }
      services {
        __typename
        ... on ComponentLinksLink {
          ...Link
        }
      }
      first_section {
        title: title_en
        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text: content_text_en

        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      second_section {
        title

        images {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text: content_text_en

        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      third_section {
        ... on ComponentSectionsImagesGrid {
          ...ImageGrid_EN
        }
      }
      pagination {
        ... on ComponentTypesPagination {
          ...Pagination
        }
      }
      forth_section {
        title: title_en
        images: images_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        content_text
        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      fifth_section {
        title: title_en

        images: images_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      sixth_section {
        title: title_en

        images: images_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }

        content_text

        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      seventh_section {
        title: title_en
        images: images_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        content_text
        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      eighth_section {
        title: title_en
        images: images_en {
          url
          name
          alternativeText
          caption
          width
          height
          id
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_DE
          }
        }
      }
      contact: impressum {
        __typename
        ... on ComponentTypesAddress {
          ...Address_EN
        }
      }
      reviews {
        ... on Review {
          ...Review
        }
      }
    }
  }

  ${fragments.link}
  ${fragments.button_de}
  ${fragments.card_en}
  ${fragments.imageGrid_en}
  ${fragments.pagination}
  ${fragments.review}
  ${fragments.address_en}
`;

export const navigation_de = gql`
  query {
    navigation {
      links: links_de {
        __typename
        ... on ComponentLinksLink {
          name
          url
        }
      }
      logo {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      logo_inverted {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      plane {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      plane_inverted {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
    }
  }
`;
export const navigation_en = gql`
  query {
    navigation {
      links: links_en {
        __typename
        ... on ComponentLinksLink {
          name
          url
        }
      }
      logo {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      logo_inverted {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      plane {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
      plane_inverted {
        name
        id
        alternativeText
        caption
        width
        height
        url
      }
    }
  }
`;
