import { Ttranslations } from "src/common/types/localize";
import { selectedLocale } from "src/common/utils/localize";
import styled from "styled-components";

const Body = (): JSX.Element => {
  const t: Ttranslations | null = selectedLocale();

  return <Container>{t?.login}</Container>;
};

const Container = styled.div`
  background: red;
`;

export default Body;
