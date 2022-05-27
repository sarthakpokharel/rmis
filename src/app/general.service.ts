import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    public translation: any = {
        "submit": {
            "En": "Submit",
            "Np": "Save"
        },
        "disabled":{
            "En":"Disabled",
            "Np":"निष्क्रिय"
        },
        "approved":{
            "En":"Approved",
            "Np":"स्वीकृत"
        }
    };

    constructor() { }

    public session(key: String) {
        if (key == 'regionwidth') {
            const fc = "1920:1080:5:5:933:144"; //this.getCookieValue("SuTRA_Resolution_hw");
            const fcs = fc.split(":");
            const width = parseInt(fcs[0]) - parseInt(fcs[2]) - parseInt(fcs[3]) + 10;
            return width;
        }
        if (key == 'containnerheight') {
            const fc = "1920:1080:5:5:933:144"; //this.getCookieValue("SuTRA_Resolution_hw");
            const fcs = fc.split(":");
            const height = parseInt(fcs[4]) - parseInt(fcs[5]) - 30;
            return height;
        }
        if (key == 'language') {
            return this.getCookieValue("lang") || "Np";
        }
        return '';
    }

    public wds(input: string): String {
        const langCode = this.getCookieValue("lang") || "Np";
        var key = input.replace(/\s/g, '').toLocaleLowerCase();
        const tt = this.translation[key]?.[langCode] || "";
        if (tt == '') {
            //add to current list
            //add to the database
            return input;
        }
        return tt;
    }

    public getGridWidth(val: string) {
        let t = 30;
        if (val) {
            t = parseInt(val);
        }
        const fc = "1920:1080:5:5:933:144"; //this.getCookieValue("SuTRA_Resolution_hw");
        const fcs = fc.split(":");
        const width = parseInt(fcs[0]) - parseInt(fcs[2]) - parseInt(fcs[3]) + 10;
        t = width * t / 100;
        t = t - 7;
        return t + "";
    }

    public getFrameWidth(val: string) {
        let t = 30;
        if (val) {
            t = parseInt(val);
        }
        const fc = "1920:1080:5:5:933:144"; //this.getCookieValue("SuTRA_Resolution_hw");
        const fcs = fc.split(":");
        const width = parseInt(fcs[0]) - parseInt(fcs[2]) - parseInt(fcs[3]) + 10;
        t = width * t / 100;
        t = t - 60;
        return t + "";
    }

    public getLabelWidth(val: string) {
        let t = 30;
        if (val) {
            t = parseInt(val);
        }
        const fc = "1920:1080:5:5:933:144"; //this.getCookieValue("SuTRA_Resolution_hw");
        const fcs = fc.split(":");
        const regionwidth = parseInt(fcs[0]) - parseInt(fcs[2]) - parseInt(fcs[3]) + 10;
        t = Math.round(regionwidth * t) / 100;
        t = Math.round(t * .4);
        if (t > 250)
            t = 250;
        return t + "";
    }

    public getCookieValue(name: string) {
        const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
        if (val != '') {
            return decodeURIComponent(val);
        }
        return val;
    }
}
