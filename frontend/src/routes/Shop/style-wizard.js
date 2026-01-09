import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--white);
  padding: 22px 16px;

  background-image: url(${(p) => p.$bg});
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 520px;

  @media (max-width: 520px) {
    background-size: 320px;
  }
`;

export const Shell = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

export const Topbar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.02em;
`;

export const PageSub = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--grey);

  b {
    color: var(--white);
    font-weight: 900;
  }
`;

export const TopbarActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SideNav = styled.div`
  background: linear-gradient(180deg, rgba(8, 23, 52, 0.72), rgba(17, 16, 22, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px;
  height: fit-content;
`;

export const NavTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const NavList = styled.div`
  display: grid;
  gap: 6px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const NavItem = styled.button`
  text-align: left;
  width: 100%;
  padding: 10px 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: ${(p) => (p.$active ? "rgba(45, 68, 172, 0.18)" : "rgba(255,255,255,0.02)")};
  color: var(--white);
  cursor: pointer;
  font-weight: 800;

  span {
    opacity: 0.8;
    margin-right: 6px;
  }

  :hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

export const StepHint = styled.p`
  margin: 10px 0 0;
  color: var(--grey);
  font-size: 12px;
  line-height: 1.5;
`;

export const Main = styled.div`
  display: grid;
  gap: 12px;
`;

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(14, 32, 70, 0.65), rgba(17, 16, 22, 0.55));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(10px);
`;

export const CardHeader = styled.div`
  margin-bottom: 12px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const CardHint = styled.p`
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--grey);
  line-height: 1.5;
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

export const Form = styled.div`
  display: grid;
  gap: 12px;
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
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
  /* width: 100%; */
  margin-bottom: 1rem;
  background: var(--inputs-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 12px;
  color: var(--white);
  outline: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  :focus {
    border-color: rgba(45, 68, 172, 0.7);
    box-shadow: 0 0 0 3px rgba(45, 68, 172, 0.18);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  background: var(--inputs-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 12px;
  color: var(--white);
  outline: none;
  resize: vertical;

  ::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  :focus {
    border-color: rgba(45, 68, 172, 0.7);
    box-shadow: 0 0 0 3px rgba(45, 68, 172, 0.18);
  }
`;

export const Select = styled.select`
  width: 100%;
  background: var(--inputs-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 12px;
  color: var(--white);
  outline: none;
`;

export const File = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.16);
  cursor: pointer;

  input {
    display: none;
  }

  span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
  }
`;

export const Helper = styled.div`
  color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
`;

export const RadioRow = styled.div`
  display: flex;
  gap: 16px;

  label {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
  }
`;

export const InfoBox = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(45, 68, 172, 0.28);
  background: rgba(45, 68, 172, 0.12);
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  line-height: 1.5;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const SummaryTitle = styled.div`
  font-weight: 900;
  margin-bottom: 8px;
`;

export const SummaryLine = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin: 6px 0;

  b {
    color: var(--white);
  }
`;

export const CheckRow = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);

  input {
    margin-top: 2px;
  }
`;

export const WizardFooter = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StepCounter = styled.div`
  color: var(--grey);
  font-size: 13px;

  b {
    color: var(--white);
    font-weight: 900;
  }
`;

export const ButtonInline = styled.button`
  border: none;
  border-radius: 12px;
  padding: 11px 14px;
  font-weight: 900;
  cursor: pointer;
  color: var(--white);
  background: linear-gradient(135deg, rgba(45, 68, 172, 1), rgba(45, 68, 172, 0.75));

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  font-weight: 900;
  cursor: pointer;
  color: var(--white);
  background: linear-gradient(135deg, rgba(45, 68, 172, 1), rgba(45, 68, 172, 0.75));

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const GhostButton = styled.button`
  border-radius: 12px;
  padding: 11px 14px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--white);
  font-weight: 900;
  cursor: pointer;

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const LogoList = styled.div`
  display: grid;
  gap: 10px;
`;

export const LogoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
`;

export const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--white);
  cursor: pointer;
  font-weight: 900;

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  border-radius: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--white);
  font-weight: 900;
  cursor: pointer;

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const Section = styled.div`
  padding: 14px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitle = styled.div`
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.92);
`;

export const SectionHint = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
`;

export const Divider = styled.div`
  height: 1px;
  margin: 10px 0 12px;
  background: linear-gradient(
    90deg,
    rgba(45, 68, 172, 0.0),
    rgba(45, 68, 172, 0.38),
    rgba(255, 255, 255, 0.10),
    rgba(45, 68, 172, 0.38),
    rgba(45, 68, 172, 0.0)
  );
`;

export const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const CheckboxItem = styled.label`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: ${(p) => (p.$compact ? "10px 12px" : "10px 12px")};
  border-radius: 12px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);

  input {
    margin-top: 2px;
  }

  span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.35;
  }

  :hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

export const DynamicList = styled.div`
  display: grid;
  gap: 10px;
`;

export const DynamicRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
`;

export const OtherRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 10px;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const IntroBox = styled.div`
  margin: 10px 0 16px;
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid rgba(45, 68, 172, 0.22);
  background: linear-gradient(
    180deg,
    rgba(45, 68, 172, 0.10),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
`;

export const IntroTitle = styled.div`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.95);
`;

export const IntroText = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.55;
`;

export const IntroList = styled.ul`
  margin: 10px 0 8px;
  padding-left: 18px;
  display: grid;
  gap: 6px;

  li {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.5;
  }

  b {
    color: rgba(255, 255, 255, 0.95);
  }
`;

export const IntroFoot = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.45;

  b {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 900;
  }
`;






