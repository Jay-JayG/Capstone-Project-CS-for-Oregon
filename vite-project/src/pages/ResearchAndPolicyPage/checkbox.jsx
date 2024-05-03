import "./ResearchAndPolicy.css"
import Check from '/src/assets/Check.webp';
import X from '/src/assets/Xmark.webp';
import idkwtf from '/src/assets/idkwtf.webp';
import GreenToRed from '/src/assets/greentored.webp';
import background from '/src/assets/greentored.webp';
import PropTypes from 'prop-types';

export default function Checkbox({header, content, mark}) {
    return (

        <div className="Card">
            <div className="innerTextContainer">
                <div className="CardHeader">{header}</div>
                <p className="BoxContent2">
                {content}
                </p>
            </div>
            {mark}
        </div>
    );
}


