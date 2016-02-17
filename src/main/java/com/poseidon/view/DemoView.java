package com.poseidon.view;

public class DemoView {
    private String       srt;
    private DemoSearch   demoSearch;
    private DemoDataGrid demoDataGrid;

    public DemoSearch getDemoSearch() {
        return demoSearch;
    }

    public void setDemoSearch(DemoSearch demoSearch) {
        this.demoSearch = demoSearch;
    }

    public DemoDataGrid getDemoDataGrid() {
        return demoDataGrid;
    }

    public void setDemoDataGrid(DemoDataGrid demoDataGrid) {
        this.demoDataGrid = demoDataGrid;
    }
}
