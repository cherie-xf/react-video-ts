import React from "react"

import { Link } from "react-router-dom"

// interface MyLocationDescObject {
//     autoplay: boolean;
//     pathname: string
// }

// interface LinkTo extends LinkProps<MyLocationDescObject> {

// }

interface PlaylistItemProps {
    item: Item
}

const WithLink = <P extends PlaylistItemProps>(
    Component: React.ComponentType<P>
): React.FC<P> => ({ ...props }) => {
    const newProps = {
        ...props,
        item: {
            ...props.item,
            title: (
                <Link to={{ pathname: `/${props.item.id}` }}>{props.item.title}</Link>
            )
        }
    }
    return <Component {...newProps as P} />;
}

export default WithLink

