import React from 'react';
import {Container} from "react-bootstrap";
import {SplitView} from "@ashxjs/split-view";
import LeftComponent from "../components/leftComponent";
import RightComponent from "../components/rightComponent";

const Dashboard = () => {
    return (
        <Container fluid className='vh-100'>
            <SplitView
                left={LeftComponent}
                right={RightComponent}
                defaultLeftPanelWidth={"33vw"}
            />
        </Container>
    );
};

export default Dashboard;
