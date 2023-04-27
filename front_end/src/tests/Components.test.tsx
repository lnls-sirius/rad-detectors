import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Alertlist from '../components/Alert';
import BarChart from '../components/BarChart';
import Footer from '../components/Footer';
import InfoBase from '../components/ModelPg/InfoBase';
import Navigation from "../components/Navigation";
import Popup_List from '../controllers/alert';

describe('Navigation', () => {
    it("Component renders", async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Navigation value={''}/>
          </BrowserRouter>
        );
      });

      const nav1 = screen.getByTestId("nav1");
      expect(nav1).toBeInTheDocument();

      const nav2 = screen.getByTestId("nav2");
      expect(nav2).toBeInTheDocument();
    })
})

describe('Footer', () => {
    it("Component render", () => {
      act(() => {
        render(
            <Footer value={false}/>
        );
      });

      const text = [
        "SwC ( swc@lnls.br )", "RAD ( rad@cnpem.br )"
      ]
      for(let i=0; i<2; i++){
        const txt_val = screen.getByText(text[i]);
        expect(txt_val).toBeInTheDocument();
      }

      const textNot = [
        "Legend", "Logarithmic Axis:"
      ]
      for(let i=0; i<2; i++){
        let txt_val = null;
        try{
            txt_val = screen.getByText(textNot[i]);
        }catch{
            console.log("Error")
        }

        expect(txt_val).toEqual(null);
      }
    })

    it("With Legend", () => {
        act(() => {
            render(
                <Footer value={true}/>
            );
        });

        const text = [
            "Legend", "Logarithmic Axis:"
        ]
        for(let i=0; i<2; i++){
            const txt_val = screen.getByText(text[i]);
            expect(txt_val).toBeInTheDocument();
        }
    })
})


class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

describe('Bar Chart', () => {
    window.ResizeObserver = ResizeObserver;
    it("Component renders", () => {
        act(() => {
            render(
                <BarChart
                    popup={new Popup_List()}
                    pvs_data={{}}/>
            );
        });

        const nav1 = screen.getByTestId("bar-chart");
        expect(nav1).toBeInTheDocument();
    })
})

describe('Alert List', () => {
  it("Component renders", () => {
      act(() => {
          render(
              <Alertlist
                popup={new Popup_List()}
                pvs_data={{}}
                setDetector={()=>{}}
                setModal={()=>{}}/>
          );
      });

      const list = screen.getByTestId("list-test");
      expect(list).toBeInTheDocument();

      const clk = screen.getByTestId("clock");
      expect(clk).toBeInTheDocument();
  })
})



describe('InfoBase', () => {
  it("", async () => {
    await act(async () => {
        render(
            <InfoBase
              name={'ID'} modal={false}
              pvs_data={{'ID': {location: '0'}}}/>
        );
    });

    let text = ["Name:"]
    const txt_val = screen.getByText(text[0]);
    expect(txt_val).toBeInTheDocument();
    text = [
      "Probe:", "Brand:", "Sector:"
    ]
    for(let i=0; i<3; i++){
        const txt_val = screen.getByText(text[i]);
        expect(txt_val).not.toBeInTheDocument();
    }
  })

  it("With Legend", async () => {
    await act(async () => {
        render(
            <InfoBase
              name={'ID'} modal={true}
              pvs_data={{'ID': {location: '0'}}}/>
        );
    });

    let text = ["Name:", "Probe:", "Brand:", "Sector:"]
    for(let i=0; i<4; i++){
        const txt_val = screen.getByText(text[i]);
        expect(txt_val).toBeInTheDocument();
    }
  })
})
