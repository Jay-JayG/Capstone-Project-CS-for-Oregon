import Section1Left from './Section1Left';
import Section1Right from './Section1Right';

function Section1( {data} ){

    return (
        <div className='Section1'>
            <Section1Left data={data}/>
            <Section1Right data={data} />
        </div>
    );

};

export default Section1;