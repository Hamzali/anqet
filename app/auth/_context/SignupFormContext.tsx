import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type SignupFormState = {
  nickname: string;
  email: string;
  password: string;
  birthdate: Date | undefined;
  privacyAgreed: boolean;
  termsAgreed: boolean;
  marketingAgreed: boolean;
  gender: string;
};

const initialState: SignupFormState = {
  nickname: "",
  email: "",
  password: "",
  birthdate: undefined,
  privacyAgreed: false,
  termsAgreed: false,
  marketingAgreed: false,
  gender: "",
};

type SignupFormAction =
  | {
      type: "SET_NICKNAME";
      payload: string;
    }
  | {
      type: "SET_EMAIL";
      payload: string;
    }
  | {
      type: "SET_PASSWORD";
      payload: string;
    }
  | {
      type: "SET_BIRTHDATE";
      payload: Date | undefined;
    }
  | {
      type: "SET_PRIVACY_AGREED";
      payload: boolean;
    }
  | {
      type: "SET_TERMS_AGREED";
      payload: boolean;
    }
  | {
      type: "SET_MARKETING_AGREED";
      payload: boolean;
    }
  | {
      type: "SET_GENDER";
      payload: string;
    };

const noop = () => {};
export const SingupFormContext = createContext<SignupFormState>(initialState);
export const SingupFormDispatchContext =
  createContext<Dispatch<SignupFormAction>>(noop);

function reducer(state: SignupFormState, action: SignupFormAction) {
  switch (action.type) {
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_BIRTHDATE":
      return { ...state, birthdate: action.payload };
    case "SET_PRIVACY_AGREED":
      return { ...state, privacyAgreed: action.payload };
    case "SET_TERMS_AGREED":
      return { ...state, termsAgreed: action.payload };
    case "SET_MARKETING_AGREED":
      return { ...state, marketingAgreed: action.payload };
    case "SET_GENDER":
      return { ...state, gender: action.payload };
  }
}

export function SignupFormProvider(props: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SingupFormContext.Provider value={state}>
      <SingupFormDispatchContext.Provider value={dispatch}>
        {props.children}
      </SingupFormDispatchContext.Provider>
    </SingupFormContext.Provider>
  );
}

export function useSignupFormContext() {
  return {
    state: useContext(SingupFormContext),
    dispatch: useContext(SingupFormDispatchContext),
  };
}
