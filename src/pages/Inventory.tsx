import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Map from "./Map";

// const inventBtn = 1;

const Container = styled.div`
  display: grid;
  color: rgba(0, 0, 0);
  background-color: rgb(204, 255, 204);
  background-image: url("../assets/backGreen.png");
`;

const Head = styled.header`
  padding: 10px;
  text-align: center;
`;

const Foot = styled.footer`
  margin: 0;
  display: flex;
  width: 100vw;
  min-height: 80px;
`;

const SubBack = styled.article`
  margin: auto;
  width: 90%;
  height: 70vh;
  background-color: white;
  border: 3px solid;
  border-color: rgb(111, 214, 111);
  border-radius: 20px;
`;

const SetContents = styled.section`
  padding-top: 20px;
  padding-bottom: 40px;
  display: flex;
  height: 20;
  justify-content: space-around;
`;

const HomeLink = styled.a`
  background: transparent;
`;

const Btn = styled.button`
  background: transparent;
  align-items: center;
`;

const SetHome = styled(HomeLink)`
  margin: auto;
  margin-top: 10px;
  margin-bottom: -20px;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 100%;
  background-image: url("../assets/Home_icon.png");
  background-size: 50px 50px;
  background-repeat: no-repeat;
  background-position: center;
`;

const SetBtn = styled(Btn)`
  display: flex;
  margin: -10px 0px 0;
  width: 100%;
  justify-content: space-around;
`;

function Inventory() {
  //   const [inventBtn, setInvetBtn] = useState(true);
  return (
    <Container>
      <Tabs>
        <TabPanel>
          <Head>ITEM</Head>
          <SubBack>
            <SetContents>
              <p>A</p>
              <p>B</p>
              <p>C</p>
            </SetContents>
          </SubBack>
        </TabPanel>
        <TabPanel>
          <Head>COLLECT</Head>
          <SubBack>
            <SetContents>
              <p>D</p>
              <p>E</p>
              <p>F</p>
            </SetContents>
          </SubBack>
        </TabPanel>
        {/* <SetHome href="/map"></SetHome> */}
        <Foot>
          <TabList>
            <Tab>
              <SetBtn /*onClick={items}*/>
                <img src="../assets/itemBox_icon.svg" alt="Item" height="50" />
              </SetBtn>
            </Tab>
            <Tab>
              <SetBtn /*onClick={collection}*/>
                <img
                  src="../assets/collect_icon.png"
                  alt="Collect"
                  height="50"
                />
              </SetBtn>
            </Tab>
          </TabList>
        </Foot>
      </Tabs>
    </Container>
  );
}

export default Inventory;
