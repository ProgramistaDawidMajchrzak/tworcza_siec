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
`;

export const TopbarActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 720px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
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

  @media (max-width: 900px) {
    position: sticky;
    top: 12px;
    z-index: 10;
  }
`;

export const NavTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
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
  font-weight: 700;

  :hover {
    border-color: rgba(255, 255, 255, 0.18);
  }
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

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 14px 0;
`;

export const SectionTitle = styled.div`
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 10px;
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

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Kpi = styled.div`
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const KpiLabel = styled.div`
  color: var(--grey);
  font-size: 12px;
`;

export const KpiValue = styled.div`
  margin-top: 6px;
  font-size: 22px;
  font-weight: 900;
`;

export const PurchaseList = styled.div`
  display: grid;
  gap: 8px;
`;

export const PurchaseRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PurchaseInfo = styled.div``;

export const PurchaseName = styled.div`
  font-weight: 800;
`;

export const PurchaseMeta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: var(--grey);
`;

export const RowActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 720px) {
    justify-content: space-between;
  }
`;

export const SmallLink = styled.a`
  color: var(--white);
  text-decoration: none;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);

  :hover {
    border-bottom-color: rgba(255, 255, 255, 0.75);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Tile = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
`;

export const TileImage = styled.div`
  height: 140px;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.04);
`;

export const TileBody = styled.div`
  padding: 12px;
`;

export const TileTitle = styled.div`
  font-weight: 900;
`;

export const TileMeta = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: var(--grey);
`;

export const TileActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TileLink = styled.a`
  color: var(--white);
  text-decoration: none;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);

  :hover {
    border-bottom-color: rgba(255, 255, 255, 0.75);
  }
`;

export const EmptyState = styled.div`
  padding: 14px;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  color: var(--grey);
  font-size: 13px;
  line-height: 1.6;
`;

export const Form = styled.div`
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
  width: 100%;
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

export const Helper = styled.div`
  color: rgba(255, 255, 255, 0.55);
  font-size: 12px;
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

export const SmallButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.02);
  color: var(--white);
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 800;
  cursor: pointer;

  :hover {
    border-color: rgba(255, 255, 255, 0.3);
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

  :hover {
    border-color: rgba(255, 255, 255, 0.35);
  }
`;

export const DangerButton = styled.button`
  border-radius: 12px;
  padding: 11px 14px;
  background: rgba(220, 53, 69, 0.12);
  border: 1px solid rgba(220, 53, 69, 0.35);
  color: rgba(255, 185, 185, 0.95);
  font-weight: 900;
  cursor: pointer;

  :hover {
    border-color: rgba(220, 53, 69, 0.55);
  }
`;

export const SkeletonList = styled.div`
  display: grid;
  gap: 10px;
`;

export const SkeletonRow = styled.div`
  height: 62px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonTile = styled.div`
  height: 240px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileItem = styled.div`
  padding: 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ProfileLabel = styled.div`
  color: var(--grey);
  font-size: 12px;
`;

export const ProfileValue = styled.div`
  margin-top: 6px;
  font-weight: 900;
`;
