import "./ResearchAndPolicy.css"



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


