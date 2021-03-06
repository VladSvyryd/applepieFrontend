import gql from "graphql-tag";

const fragments = {
  link_de: gql`
    fragment Link_DE on ComponentLinksLink {
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
    }
  `,
  link_en: gql`
    fragment Link_EN on ComponentLinksLink {
      name: name_en
      url: url_en
      image: image_en {
        url
        name
        alternativeText
        caption
        width
        height
        id
      }
      image_alternative: image_alternative_en {
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
      text: text_en
      subtext_en
      function_en: url_en
      type
      link_type
      slideTo
      button_type
    }
  `,
  button_de: gql`
    fragment Button_DE on ComponentButtonsButton {
      id
      text
      subtext
      function: url
      type
      link_type
      slideTo
      button_type
    }
  `,
  card_en: gql`
    fragment Card_EN on ComponentSectionsCard {
      title: title_en
      subtitle: subtitle_en
      image: image_en {
        id
        url
        name
        alternativeText
        caption
        width
        height
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
      title:title_en
      images:images_en {
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
  pagination_en: gql`
    fragment Pagination_EN on ComponentTypesPagination {
      id
      title
      icons {
        id
        name: name_en
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
  pagination_de: gql`
    fragment Pagination_DE on ComponentTypesPagination {
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
      lat
      lng
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
      lat
      lng
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
      buttons {
        ... on ComponentButtonsButton {
          ...Button_DE
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
          ...Pagination_DE
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
      eighth_section {
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

      meta {
        title
        description
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
    }
  }

  ${fragments.button_de}
  ${fragments.card_de}
  ${fragments.imageGrid_de}
  ${fragments.pagination_de}
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
      buttons {
        ... on ComponentButtonsButton {
          ...Button_EN
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
            ...Button_EN
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
            ...Button_EN
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
          ...Pagination_EN
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
        content_text: content_text_en
        cards {
          ... on ComponentSectionsCard {
            ...Card_EN
          }
        }
        button {
          ... on ComponentButtonsButton {
            ...Button_EN
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
            ...Button_EN
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
            ...Button_EN
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
            ...Button_EN
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
            ...Button_EN
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
      meta {
        title: title_en
        description: description_en
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
    }
  }

  ${fragments.button_en}
  ${fragments.card_en}
  ${fragments.imageGrid_en}
  ${fragments.pagination_en}
  ${fragments.review}
  ${fragments.address_en}
`;

export const navigation_de = gql`
  query {
    navigation {
      links {
        __typename
        ... on ComponentButtonsButton {
          ...Button_DE
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
  ${fragments.button_de}
`;
export const navigation_en = gql`
  query {
    navigation {
      links {
        __typename
        ... on ComponentButtonsButton {
          ...Button_EN
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
  ${fragments.button_en}
`;

export const footer_de = gql`
  query {
    footer {
      navigation_links {
        __typename
        ... on ComponentLinksLink {
          id
          name
          url
        }
      }
      known_by {
        __typename
        ... on ComponentLinksLink {
          id
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
        }
      }
      social_links {
        __typename
        ... on ComponentLinksLink {
          id
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
        }
      }
    }
  }
`;

export const footer_en = gql`
  query {
    footer {
      navigation_links {
        __typename
        ... on ComponentLinksLink {
          id
          name
          url
        }
      }
      known_by {
        __typename
        ... on ComponentLinksLink {
          id
          name
          url
          image: image_en {
            url
            name
            alternativeText
            caption
            width
            height
            id
          }
          image_alternative: image_alternative_en {
            url
            name
            alternativeText
            caption
            width
            height
            id
          }
        }
      }
      social_links {
        __typename
        ... on ComponentLinksLink {
          id
          name
          url
          image: image_en {
            url
            name
            alternativeText
            caption
            width
            height
            id
          }
          image_alternative: image_alternative_en {
            url
            name
            alternativeText
            caption
            width
            height
            id
          }
        }
      }
    }
  }
`;

export const services_de = gql`
  query {
    service {
      service {
        __typename
        ... on ComponentTypesService {
          group
          name
          pipedrive_id
          description
        }
      }
    }
  }
`;

export const services_en = gql`
  query {
    service {
      service {
        __typename
        ... on ComponentTypesService {
          group
          name: name_en
          pipedrive_id
          description: description_en
        }
      }
    }
  }
`;

export const contact_form_de = gql`
  query {
    contact {
      services_question
      service_error_message
      name_question
      name
      name_error_message
      email_question
      email_placeholder
      email_question_error
      project_question
      budget_error_message
      budget_title
      budget_placeholder
      date_title
      message_title
      message_placeholder
      message_error
    }
  }
`;

export const contact_form_en = gql`
  query {
    contact {
      services_question: services_question_en
      service_error_message: service_error_message
      name_question: name_question
      name: name_en
      name_error_message: name_error_message_en
      email_question: email_question_en
      email_placeholder: email_placeholder_en
      email_question_error: email_question_error_en
      project_question: project_question_en
      budget_error_message: budget_error_message_en
      budget_title: budget_title_en
      budget_placeholder: budget_placeholder_en
      date_title: date_title_en
      message_title: message_title_en
      message_placeholder: message_placeholder_en
      message_error: message_error_en
    }
  }
`;

export const legal_links_de = gql`
  query {
    legal {
      links {
        text
        function: url
        type
      }
    }
  }
`;
export const legal_links_en = gql`
  query {
    legal {
      links {
        text: text_en
        function: url_en
        type
      }
    }
  }
`;

export const legal_links_with_text_de = gql`
  query {
    legal {
      links {
        text
        function: url
        subtext
      }
    }
  }
`;
export const legal_links_with_text_en = gql`
  query {
    legal {
      links {
        text: text_en
        function: url_en
        subtext: subtext_en
      }
    }
  }
`;
