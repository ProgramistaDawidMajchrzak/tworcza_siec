import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px 16px;

  /* Ellipsy */
  background-image: url(${(p) => p.$bg});
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 520px;
  
  @media (max-width: 900px) {
    background-size: 420px;
    background-position: left top;
  }

  @media (max-width: 520px) {
    background-size: 320px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
`;

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(14, 32, 70, 0.65), rgba(17, 16, 22, 0.55));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);

  @media (max-width: 520px) {
    padding: 18px 16px;
    border-radius: 16px;
  }
`;

export const Header = styled.div`
  margin-bottom: 14px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.02em;

  @media (max-width: 520px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: var(--grey);
  font-size: 14px;
  line-height: 1.5;
`;

export const Form = styled.form`
  margin-top: 14px;
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.86);
`;

export const Input = styled.input`
  width: auto;
  background: var(--inputs-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 12px;
  color: var(--white);
  outline: none;
  transition: border-color 0.15s ease, transform 0.12s ease;

  ::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  :focus {
    border-color: rgba(45, 68, 172, 0.7);
    box-shadow: 0 0 0 3px rgba(45, 68, 172, 0.18);
  }
`;

export const Helper = styled.div`
  margin-top: -2px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
`;

export const Alert = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  font-size: 13px;
  line-height: 1.4;

  background: ${(p) =>
    p.$type === "success"
      ? "rgba(40, 167, 69, 0.12)"
      : "rgba(220, 53, 69, 0.12)"};

  color: ${(p) =>
    p.$type === "success"
      ? "rgba(180, 255, 200, 0.95)"
      : "rgba(255, 185, 185, 0.95)"};
`;

export const Button = styled.button`
  margin-top: 4px;
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 700;
  cursor: pointer;
  color: var(--white);
  background: linear-gradient(135deg, rgba(45, 68, 172, 1), rgba(45, 68, 172, 0.75));
  transition: transform 0.12s ease, opacity 0.12s ease;

  :hover {
    transform: translateY(-1px);
  }

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 8px;
  color: var(--grey);
  font-size: 13px;
`;

export const FooterLink = styled.a`
  color: var(--white);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);

  :hover {
    border-bottom-color: rgba(255, 255, 255, 0.7);
  }
`;

/* Prawy panel info */

export const SideInfo = styled.div`
  background: radial-gradient(1200px 600px at 0% 0%, rgba(45, 68, 172, 0.25), transparent 55%),
    linear-gradient(180deg, rgba(8, 23, 52, 0.72), rgba(17, 16, 22, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(45, 68, 172, 0.18);
  border: 1px solid rgba(45, 68, 172, 0.35);
  color: rgba(255, 255, 255, 0.92);
  margin-bottom: 12px;
`;

export const SideTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const SideText = styled.p`
  margin: 10px 0 0;
  color: var(--grey);
  font-size: 13px;
  line-height: 1.6;
`;

export const SideList = styled.ul`
  margin: 14px 0 0;
  padding-left: 18px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 13px;
  line-height: 1.7;

  li {
    margin: 6px 0;
  }
`;

export const GhostButton = styled.button`
  margin-top: 16px;
  width: 100%;
  border-radius: 12px;
  padding: 12px 14px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;


// --------------------LOGIN----------------

export const SecondaryRow = styled.div`
  margin-top: 10px;
`;

export const SecondaryButton = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


export const SingleContainer = styled.div`
  width: 100%;
  max-width: 560px;
`;

export const Actions = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 12px;
`;

export const SuccessPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(40, 167, 69, 0.35);
  background: rgba(40, 167, 69, 0.12);
  color: rgba(180, 255, 200, 0.95);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const SmallText = styled.p`
  margin: 6px 0 0;
  color: var(--grey);
  font-size: 13px;
  line-height: 1.6;
`;

