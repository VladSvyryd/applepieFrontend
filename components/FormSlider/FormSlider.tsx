import { forwardRef, useState, useImperativeHandle, FC } from "react";
import { motion } from "framer-motion";
import formSlider from "./formSlider.module.scss";
import { useStoreState } from "../../hooks";
import { Language } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
const FormSlider = forwardRef((_props, ref) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const [, setResponse] = useState({
    type: "",
    message: "",
  });
  const [canGoNextSlide, setcanGoNextSlide] = useState(true);

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
        currentLanguage !== Language.de ? "Oops mistyped?" : "Ups vertippt?";
      setcanGoNextSlide(false);
    } else {
      setcanGoNextSlide(true);
    }
    return errorMessage;
  };
  const isRequiredName = (value: any) => {
    let errorMessage;
    console.log(value);
    if (value.length <= 0) {
      errorMessage =
        currentLanguage !== Language.de
          ? "No name, no game."
          : "Ohne Namen läuft nichts.";
      setcanGoNextSlide(false);
    } else {
      setcanGoNextSlide(true);
    }

    return errorMessage;
  };
  const isRequiredMessage = (value: any) => {
    let errorMessage;
    if (value.length <= 0) {
      errorMessage =
        currentLanguage !== Language.de
          ? "Keep calm and tell your story."
          : "Erzähl uns ruhig worum es geht.";
      setcanGoNextSlide(false);
    } else {
      setcanGoNextSlide(true);
    }
    return errorMessage;
  };
  // const isRequiredService = (value: any) => {
  //   let errorMessage;
  //   if (value.length <= 0) {
  //     errorMessage =
  //       currentLanguage !== Language.de
  //         ? "Keep calm and tell us which field are you interested in."
  //         : "Erzähl uns welches Gebiet interessiert Dich.";
  //     setcanGoNextSlide(false);
  //   } else {
  //     setcanGoNextSlide(true);
  //   }
  //   return errorMessage;
  // };
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument

  useImperativeHandle(ref, () => ({
    goToNext() {
      handleNextSlideClick();
    },
    goToPrev() {
      handlePrevSlideClick();
    },
  }));
  const [currentSlider, setCurrentClient] = useState(0);
  const reveal = {
    open: { scale: 1, x: 0, transition: { duration: 0.3 } },
    closed: { scale: 0, x: 0, transition: { duration: 0.3 } },
  };
  const SLIDESCOUNT = 4;
  const handleNextSlideClick = () => {
    if (canGoNextSlide && currentSlider >= 0 && currentSlider < 3) {
      console.log("GoNext");
      setCurrentClient(currentSlider + 1);
    }
  };
  const handlePrevSlideClick = () => {
    if (canGoNextSlide && currentSlider > 0 && currentSlider <= 3) {
      console.log("GoPrev");
      setCurrentClient(currentSlider - 1);
    }
  };
  const activeBullet = {
    active: { scale: 1.57, transition: { type: "spring", stiffness: 100 } },
    passive: { scale: 1, transition: { type: "spring", stiffness: 100 } },
  };
  const [canBeValidated, setCV] = useState("");
  return (
    <div className={formSlider.mySlider}>
      <div className={formSlider.paginationContainer}>
        {"" + canGoNextSlide}
        <motion.div className={formSlider.pagination}>
          {new Array(SLIDESCOUNT).fill(null).map((_bullet, i) => (
            <motion.div
              key={"ser" + i}
              className={`${formSlider.bulletContainer}`}
            >
              <motion.span
                animate={currentSlider === i ? "active" : "passive"}
                variants={activeBullet}
                className={`${formSlider.bullet} ${
                  currentSlider === i && formSlider.active
                }`}
              ></motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className={formSlider.sliderContainer}>
        <Formik
          initialValues={{ email: "", name: "", message: "", services: [] }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className={`${formSlider.form}  themeForm`}>
              <motion.div
                className={`${formSlider.slide}`}
                animate={currentSlider === 0 ? "open" : "closed"}
                variants={reveal}
              >
                <div className={formSlider.header}>
                  <h2>Which category best fits your project?</h2>
                </div>
                <div
                  className={
                    formSlider.fieldRow + " " + formSlider.checkboxContainer
                  }
                >
                  <Checkbox name="services" value="Design" />
                  <Checkbox name="services" value="IT-Support" />
                  <Checkbox name="services" value="Social Media" />
                  <Checkbox name="services" value="Programming" />
                  <Checkbox name="services" value="Online-marketing" />
                  <Checkbox name="services" value="Business consulting" />
                  {JSON.stringify(values, null, 2)}
                  <ErrorMessage name="name" component={Error} />
                </div>
              </motion.div>
              <motion.div
                className={`${formSlider.slide}`}
                animate={currentSlider === 1 ? "open" : "closed"}
                variants={reveal}
              >
                <div className={formSlider.header}>
                  <h2>What's your name? </h2>
                </div>
                <div className={formSlider.fieldRow}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    validate={canBeValidated === "name" && isRequiredName}
                    className={formSlider.input}
                    onFocus={() => setCV("name")}
                  />
                  <ErrorMessage name="name" component={Error} />
                </div>
              </motion.div>
              <motion.div
                className={`${formSlider.slide}`}
                animate={currentSlider === 2 ? "open" : "closed"}
                variants={reveal}
              >
                <div className={formSlider.header}>
                  <h2>What is your email?</h2>
                </div>
                <div className={formSlider.fieldRow}>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    validate={canBeValidated === "email" && validate}
                    className={formSlider.input}
                    onFocus={() => setCV("email")}
                  />
                  <ErrorMessage name="email" component={Error} />
                </div>
              </motion.div>
              <motion.div
                className={`${formSlider.slide}`}
                animate={currentSlider === 3 ? "open" : "closed"}
                variants={reveal}
              >
                <div className={formSlider.header}>
                  <h2>Project description</h2>
                </div>
                <div className={formSlider.textareaRow}>
                  <Field
                    type="text"
                    name="message"
                    validate={canBeValidated === "message" && isRequiredMessage}
                    as="textarea"
                    className={`${formSlider.input} ${formSlider.textfield}`}
                    placeholder={`${
                      currentLanguage === 0
                        ? "About project"
                        : "Projektbeschreibung"
                    }`}
                    onFocus={() => setCV("message")}
                  />
                  <ErrorMessage name="message" component={Error} />
                </div>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <div className={formSlider.press}>Press Enter</div>
      <button onClick={() => handleNextSlideClick()}>Next</button>
    </div>
  );
});

type CheckboxProps = {
  name: string;
  value: string;
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
      className={formSlider.errorMessage}
    >
      {children}
    </motion.div>
  );
};
export const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field, form }: any) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value: string) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          <div className={formSlider.labelText}>{props.value}</div>
        </label>
      )}
    </Field>
  );
};
export default FormSlider;
