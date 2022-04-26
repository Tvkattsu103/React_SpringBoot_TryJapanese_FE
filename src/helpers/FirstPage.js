import { useHistory } from "react-router-dom";

const FirstPage = (props) => {
    let history = useHistory();

    const someEventHandler = (event) => {
       history.push({
           pathname: '/'
       });
    };

};

export default FirstPage;