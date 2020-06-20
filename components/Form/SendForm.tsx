import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import formStyles from "./form.module.scss";
import { motion } from "framer-motion";
import { useStoreState } from "../../hooks";
import { SendFormProps, Language } from "../../types/types";

interface Person {
  name: string;
  email: string;
}
interface Response {
  data?: { id?: number; name: string };
  success: boolean;
  error: string;
}
interface ResponseDeal {
  data?: { id?: number };
  success: boolean;
  error: string;
}

const SendForm: React.FC<SendFormProps> = ({ button }) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const [response, setResponse] = useState({
    type: "",
    message: "",
  });
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    console.log("handleSubmit");
    const createPersonValues: Person = {
      name: values.name,
      email: values.email,
    };

    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/persons?api_token=${process.env.PIPEDRIVE}`,
        {
          method: "POST",
          body: JSON.stringify(createPersonValues),
          headers: { "Content-Type": "application/json" },
        }
      );

      const json: Response = await res.json();

      if (json.success) {
        setResponse({
          type: "Success",
          message: "Thank you for reaching out to us.",
        });
        resetForm({});
        setSubmitting(false);
        const deal_id =
          json.data?.id &&
          (await createDeal(json.data?.id, `SP // ${json.data?.name}`));

        typeof deal_id === "number" &&
          json.data?.id &&
          createActivity(json.data?.id, deal_id, values.message);

        // toggleOpen();
      } else {
        setResponse({
          type: "Error",
          message: json.error,
        });
        setSubmitting(false);
        // toggleOpen();
      }
    } catch (e) {
      console.log("An error occurred", e);
      //   toggleOpen();

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };
  const createDeal = async (user_id: number, title: string) => {
    const deal = {
      title: title,
      person_id: user_id,
    };
    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/deals?api_token=${process.env.PIPEDRIVE}`,
        {
          method: "POST",
          body: JSON.stringify(deal),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json: ResponseDeal = await res.json();
      if (json.success) {
        return json.data?.id;
      }
    } catch (e) {
      console.log("An error occurred", e);
      //   toggleOpen();

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };

  const createActivity = async (
    user_id: number,
    deal_id: number,
    message: string
  ) => {
    const activity = {
      person_id: user_id,
      deal_id: deal_id,
      subject: "antworte auf Anfrage",
      type: "email",
      note: message,
    };
    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/activities?api_token=${process.env.PIPEDRIVE}`,
        {
          method: "POST",
          body: JSON.stringify(activity),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await res.json();

      if (json.success) {
        setResponse({
          type: "Success",
          message: "Thank you for reaching out to us.",
        });
      } else {
        setResponse({
          type: "Error",
          message: json.error,
        });
      }
    } catch (e) {
      console.log("An error occurred", e);
      //   toggleOpen();

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };

  const validate = (value: any) => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      console.log(currentLanguage);
      errorMessage =
        currentLanguage !== Language.de
          ? "Invalid email address"
          : "Ungültige E-mail Address";
    }
    return errorMessage;
  };
  const isRequired = (value: any) => {
    let errorMessage;
    if (value.length <= 0) {
      errorMessage =
        currentLanguage !== Language.de
          ? "This field is required"
          : "Dieses Feld ist erforderlich";
    }
    return errorMessage;
  };
  useEffect(() => {
    // console.log(response);
  }, [response]);
  return (
    <Formik
      initialValues={{ email: "", name: "", message: "" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={`${formStyles.form}  themeForm`}>
          <div className={formStyles.fieldRow}>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              validate={isRequired}
              className={formStyles.input}
            />
            <ErrorMessage name="name" component={Error} />
          </div>
          <div className={formStyles.fieldRow}>
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              validate={validate}
              className={formStyles.input}
            />
            <ErrorMessage name="email" component={Error} />
          </div>
          <div className={formStyles.textareaRow}>
            <Field
              type="text"
              name="message"
              validate={isRequired}
              as="textarea"
              className={`${formStyles.input} ${formStyles.textfield}`}
              placeholder={`${
                currentLanguage === 0 ? "About project" : "Projektbeschreibung"
              }`}
            />
            <ErrorMessage name="message" component={Error} />
          </div>
          <motion.button
            className={` ${formStyles.button}`}
            data-swiper-parallax="1100"
            data-swiper-parallax-opacity="0"
            // whileHover={{ scale: 0.9 }}
            whileTap={{ scale: `${isSubmitting && 0.9}` }}
            type="submit"
            disabled={isSubmitting}
          >
            {!button ? "Button" : button?.text}
          </motion.button>
        </Form>
      )}
    </Formik>
  );
};

const Error: React.FC = ({ children }) => {
  console.log(children);
  const errAnim = {
    on: { opacity: 1, y: 0 },
    off: { opacity: 0, y: -30 },
  };
  return (
    <motion.div
      variants={errAnim}
      initial="off"
      animate="on"
      exit="off"
      className={formStyles.errorMessage}
    >
      {children}
    </motion.div>
  );
};
export default SendForm;
