
import { Route, RouteProps } from 'react-router-dom';
import Layout from './Layout';


const LayoutRoute = ({ component: Component, ...rest }: React.ComponentType<RouteComponentProps<any>> & { component: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            <Layout>
                <Component {...matchProps} />
            </Layout>
        )} />
    );
};

export default LayoutRoute;