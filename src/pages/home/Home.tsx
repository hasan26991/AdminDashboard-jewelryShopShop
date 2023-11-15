import BarChartBox from "components/barChartBox/BarChartBox";
import BigChartBox from "components/bigChartBox/BigChartBox";
import ChartBox from "components/chartBox/ChartBox";
import PieChartBox from "components/pieCartBox/PieChartBox";
import TopBox from "components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
// import { useTestApi } from "hooks/api/useTestApi";
import "./home.scss";

const Home = () => {
  // const { todos } = useTestApi();

  // eslint-disable-next-line no-console
  // console.log(todos);

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
