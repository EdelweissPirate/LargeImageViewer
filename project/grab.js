const grab = {
    start: (object) => {
        startDrag(object);
        props.grab.obj = object;
    },

    update: () => {
        let active = props.grab.obj;

        switch(active) {
            case _.grabber:
                let delta_x = props.grabberCoordsHome.x - _.grabber.x;
                let delta_y = props.grabberCoordsHome.y - _.grabber.y;

                let new_x = props.animCoords.x - delta_x;
                let new_y = props.animCoords.y - delta_y;

                _.holder_image.content.x = new_x;
                _.holder_image.content.y = new_y;
            break;
        };
    },

    stop: () => {
        stopDrag();
        props.grab.obj = null;
    }
};