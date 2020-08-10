import {
  forwardRef,
  useState,
  useImperativeHandle,
  FC,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import formSlider from "./formSlider.module.scss";
import { useStoreState, useStoreActions } from "../../hooks";
import { Language } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Congrats from "../Congrats/Congrats";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DatePicker from "react-datepicker";

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
const initialFormikState = {
  email: "",
  name: "",
  message: "",
  value: "",
  services: [],
  date: "",
};
enum SERVICE_ID_BACKEND {
  SHOP = 28,
  GET_NEW_CLIENTS = 29,
  CONVERSION_RATE = 30,
  EMAIL_MARKETIN = 31,
}
const UNIQUE_SERVICE_DEALFIELD = "d9bd3966fcf0780f67fbca93b7d32656f6769ab0";
// const UNIQUE_SERVICE_DEALFIELD = "146a6087ef8c0aa7f7bffe8d022eb2c1ab73542e";

const FormSlider = forwardRef<any>((props, ref) => {
  const currentLanguage = useStoreState(
    (state) => state.language.currentLanguage
  );
  const setInterFormState = useStoreActions(
    (state) => state.device.setInterFormState
  );
  const [, setResponse] = useState({
    type: "",
    message: "",
  });
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const createPersonValues: Person = {
      name: values.name,
      email: values.email,
    };

    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/persons?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
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
          (await createDeal(
            json.data?.id,
            `SP // ${json.data?.name}`,
            formObject.value,
            values.services,
            values.date
          ));

        typeof deal_id === "number" &&
          json.data?.id &&
          createActivity(json.data?.id, deal_id, values.message);
      } else {
        setResponse({
          type: "Error",
          message: json.error,
        });
        setSubmitting(false);
      }
    } catch (e) {
      console.log("An error occurred", e);

      setResponse({
        type: "error",
        message:
          "An error occured while submitting the form, please try again.",
      });
    }
  };
  const createDeal = async (
    user_id: number,
    title: string,
    value: string,
    services: [string],
    date: string
  ) => {
    let deal: any = {
      title: title,
      person_id: user_id,
      value: value,
      expected_close_date: date,
    };
    deal[UNIQUE_SERVICE_DEALFIELD.toString()] = services.join(",");
    try {
      const res = await fetch(
        `https://applepie.pipedrive.com/api/v1/deals?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
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
        `https://applepie.pipedrive.com/api/v1/activities?api_token=${process.env.PIPEDRIVE_API_ACCESS_KEY}`,
        {
          method: "POST",
          body: JSON.stringify(activity),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await res.json();

      if (json.success) {
        setCurrentSlide(4);
        setCongratsName(formObject.name);
        setFormObject(initialFormikState);
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
      errorMessage =
        currentLanguage !== Language.de ? "Oops mistyped?" : "Ups vertippt?";
      setFormObject((prev) => ({ ...prev, email: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, email: value }));
    }
    return errorMessage;
  };
  const isRequiredName = (value: any) => {
    let errorMessage;
    if (value.length <= 0) {
      errorMessage =
        currentLanguage !== Language.de
          ? "No name, no game."
          : "Ohne Namen läuft nichts.";
      setFormObject((prev) => ({ ...prev, name: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, name: value }));
    }
    return errorMessage;
  };
  const isRequiredPrice = (value: any) => {
    console.log(value);
    let errorMessage;
    if (value.length <= 0) {
      errorMessage =
        currentLanguage !== Language.de
          ? "No money, no honey."
          : "Ohne Geld läuft nichts.";
      setFormObject((prev) => ({ ...prev, value: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, value }));
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
      setFormObject((prev) => ({ ...prev, message: "" }));
    } else {
      setFormObject((prev) => ({ ...prev, message: value }));
    }
    return errorMessage;
  };

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
  const [currentSlider, setCurrentSlide] = useState(0);
  const reveal = {
    active: {
      scale: 1,
      x: 0,
      transition: { duration: 0.3, when: "beforeChildren" },
    },
    passive: {
      scale: 0,
      x: 0,
      transition: { duration: 0.3, when: "beforeChildren" },
    },
  };
  const SLIDESCOUNT = 5;
  const canIGoNext = () => {
    const currentSlideIndex = currentSlider;
    let key = false;
    switch (currentSlideIndex) {
      case 0:
        if (formObject.services.length > 0) {
          key = true;
        }
        break;
      case 1:
        if (formObject.name.length > 0) {
          key = true;
        }
        break;
      case 2:
        if (formObject.email.length > 0) {
          key = true;
        }
        break;
      case 3:
        if (
          formObject.value.length > 0 &&
          formObject.date.length > 0 &&
          formObject.message.length > 0
        ) {
          key = true;
        }
        break;

      default:
        key: false;
        break;
    }
    return key;
  };
  const handleNextSlideClick = () => {
    if (canIGoNext() && currentSlider >= 0 && currentSlider < 3) {
      setCurrentSlide(currentSlider + 1);
      console.log(currentSlider + 1);
      switch (currentSlider + 1) {
        case 1:
          nameRef.current.focus();
          break;
        case 2:
          emailRef.current.focus();
          break;
        case 3:
          geldRef.current.focus();
          break;
        default:
          break;
      }
    }
    if (currentSlider === 4) {
      setInterFormState(false);
    }
  };
  const handlePrevSlideClick = () => {
    if (canIGoNext() && currentSlider > 0 && currentSlider <= 3) {
      setCurrentSlide(currentSlider - 1);
    }
  };
  const activeBullet = {
    active: { scale: 1.57, transition: { type: "spring", stiffness: 100 } },
    passive: { scale: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const services = [
    {
      group: "services",
      value: SERVICE_ID_BACKEND.SHOP,
      name: "Shop Programmierung",
    },
    {
      group: "services",
      value: SERVICE_ID_BACKEND.GET_NEW_CLIENTS,
      name: "Neukundengewinnung",
    },
    {
      group: "services",
      value: SERVICE_ID_BACKEND.CONVERSION_RATE,
      name: "Conversion Optimierung",
    },
    {
      group: "services",
      value: SERVICE_ID_BACKEND.EMAIL_MARKETIN,
      name: "E-Mail-Marketing",
    },
  ];
  const interactiveFormOpened = useStoreState(
    (state) => state.device.interactiveFormOpened
  );
  const [formObject, setFormObject] = useState(initialFormikState);
  const [congratsName, setCongratsName] = useState("");
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const geldRef = useRef<any>();
  useEffect(() => {
    setCongratsName("");
    if (currentSlider === 4) setCurrentSlide(0);
  }, [interactiveFormOpened]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const ExampleCustomInput = ({ value, onClick }: any) => (
    <div
      className={formSlider.input}
      style={{ lineHeight: "normal" }}
      onClick={onClick}
    >
      {value}
    </div>
  );

  return (
    <div className={formSlider.mySlider}>
      <div className={formSlider.paginationContainer}>
        <motion.div
          className={`${formSlider.pagination} ${
            //@ts-ignore
            props.inverted && formSlider.inverted
          } `}
        >
          {new Array(SLIDESCOUNT).fill(null).map((_bullet, i) => (
            <motion.div
              key={"ser" + i}
              className={`${formSlider.bulletContainer}`}
            >
              <motion.span
                animate={currentSlider === i ? "active" : "passive"}
                variants={activeBullet}
                className={`${formSlider.bullet} ${
                  //@ts-ignore
                  props.inverted && formSlider.inverted
                } ${currentSlider === i && formSlider.active}`}
              ></motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className={formSlider.sliderContainer}>
        <Formik initialValues={initialFormikState} onSubmit={handleSubmit}>
          {({ isSubmitting, handleSubmit }) => (
            <>
              <Form className={`${formSlider.form}  themeForm`}>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 0 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={`${formSlider.header} ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <h2>Which category best fits your project?</h2>
                  </div>
                  <div
                    className={`${formSlider.fieldRow} + " " + ${
                      formSlider.checkboxContainer
                    } ${
                      //@ts-ignore
                      props.inverted && formSlider.inverted
                    }`}
                  >
                    <CheckboxGroup
                      checkboxArray={services}
                      setCheckboxStatus={setFormObject}
                      inverted={
                        //@ts-ignore
                        props.inverted
                      }
                    />
                    <ErrorMessage name="services" component={Error} />
                    {!canIGoNext() && (
                      <Error>
                        {currentLanguage !== Language.de
                          ? "Please pick one or more categories"
                          : "Wofür interessierst Du dich? Hacke ein oder mehr."}
                      </Error>
                    )}
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 1 ? "active" : "passive"}
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
                      validate={isRequiredName}
                      className={formSlider.input}
                      innerRef={nameRef}
                      autoFocus
                    />
                    <ErrorMessage name="name" component={Error} />
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 2 ? "active" : "passive"}
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
                      validate={validate}
                      className={formSlider.input}
                      innerRef={emailRef}
                    />
                    <ErrorMessage name="email" component={Error} />
                  </div>
                </motion.div>
                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 3 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div className={formSlider.header}>
                    <h2>Project description</h2>
                  </div>
                  <div
                    className={`${formSlider.textareaRow} ${formSlider.fieldRowMultiple}`}
                    style={{
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 100,
                      position: "relative",
                    }}
                  >
                    <h4>Geld</h4>
                    <Field
                      type="text"
                      name="value"
                      validate={isRequiredPrice}
                      className={formSlider.input}
                      innerRef={geldRef}
                      placeholder="3000"
                    />
                    <span className={formSlider.euro}>€</span>
                    <ErrorMessage name="value" component={Error} />
                  </div>

                  <div
                    className={`${formSlider.textareaRow} ${formSlider.fieldRowMultiple}`}
                    style={{ marginBottom: 20 }}
                  >
                    <h4>Date</h4>
                    <DatePicker
                      selected={startDate}
                      dateFormat="dd.MM.yyyy"
                      popperPlacement="bottom-center"
                      customInput={<ExampleCustomInput />}
                      onChange={(date) => setStartDate(date)}
                    />
                    <ErrorMessage name="date" component={Error} />
                  </div>
                  <div className={formSlider.textareaRow}>
                    <h4>
                      {currentLanguage === 0
                        ? "About project"
                        : "Projektbeschreibung"}
                    </h4>
                    <Field
                      type="text"
                      name="message"
                      validate={isRequiredMessage}
                      as="div"
                      className={`${formSlider.input} `}
                    >
                      {({ form: { setFieldValue } }: any) => (
                        <TextareaAutosize
                          aria-label="minimum height"
                          rowsMin={3}
                          rowsMax={11}
                          onChange={(event) =>
                            setFieldValue("message", event.target.value)
                          }
                          className={`${formSlider.textfield}`}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="message" component={Error} />
                  </div>
                </motion.div>

                <motion.div
                  className={`${formSlider.slide}`}
                  animate={currentSlider === 4 ? "active" : "passive"}
                  variants={reveal}
                >
                  <div
                    className={formSlider.header}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <Congrats />
                    <h2>Congratulations, {congratsName}!</h2>
                  </div>
                </motion.div>
              </Form>
              {currentSlider === 3 && (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!canIGoNext() && isSubmitting}
                  className={`button ${formSlider.button} ${
                    //@ts-ignore
                    props.inverted && formSlider.inverted
                  }`}
                >
                  {currentLanguage === Language.de ? "LOS" : "GO"}
                </button>
              )}
            </>
          )}
        </Formik>
      </motion.div>

      {currentSlider < 3 && (
        <>
          <div
            className={`${formSlider.press} ${
              //@ts-ignore
              props.inverted && formSlider.inverted
            }`}
          >
            {currentSlider === 4 ? "Back to page" : "Press Enter"}
          </div>
          <button
            className={`button ${formSlider.button} ${
              //@ts-ignore
              props.inverted && formSlider.inverted
            }`}
            onClick={() => handleNextSlideClick()}
          >
            {currentLanguage === Language.de ? "Weiter" : "Next"}
          </button>
        </>
      )}
    </div>
  );
});

const Error: React.FC = ({ children }) => {
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
type CheckboxProps = {
  checkboxArray: { group: string; name: string; value: SERVICE_ID_BACKEND }[];
  setCheckboxStatus: Dispatch<SetStateAction<any>>;
  inverted: boolean;
  [x: string]: any;
};
export const CheckboxGroup: FC<CheckboxProps> = (props) => {
  const { checkboxArray, setCheckboxStatus, inverted } = props;
  const updateFormikState = (form: any, field: any, service: any) => {
    if (field.value.includes(service.value)) {
      const nextValue = field.value.filter(
        (value: string) => value !== service.value
      );
      form.setFieldValue(service.group, nextValue);
    } else {
      const nextValue = field.value.concat(service.value);
      form.setFieldValue(service.group, nextValue);
    }
    form.setFieldError(service.group, field.value.error);
  };
  const validate = (e: any) => {
    let errorMessage;
    if (e.length > 0) {
      setCheckboxStatus((prev: any) => ({ ...prev, services: e }));
    } else {
      setCheckboxStatus((prev: any) => ({ ...prev, services: [] }));

      errorMessage = "ERROR";
    }
    return errorMessage;
  };
  return (
    <>
      {checkboxArray.map(
        (service: {
          group: string;
          name: string;
          value: SERVICE_ID_BACKEND;
        }) => (
          <Field
            name={service.group}
            key={service.name + "-" + service.value}
            validate={(e: any) => validate(e)}
          >
            {({ field, form }: any) => (
              <label>
                <input
                  type="checkbox"
                  checked={field.value.includes(service.value)}
                  onChange={() => updateFormikState(form, field, service)}
                />
                <div
                  className={`${formSlider.labelText} ${
                    inverted && formSlider.inverted
                  }`}
                >
                  {service.name}
                </div>
              </label>
            )}
          </Field>
        )
      )}
      <ErrorMessage name="services" component={Error} />
    </>
  );
};
export default FormSlider;
