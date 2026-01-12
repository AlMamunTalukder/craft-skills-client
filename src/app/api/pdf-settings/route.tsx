/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/site/pdf-settings/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
    const { showPdfMenu } = await request.json();

    // First, get current site data
    const getResponse = await fetch(`${API_URL}/site`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!getResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch site data',
        },
        { status: getResponse.status }
      );
    }

    const siteData = await getResponse.json();
    
    // Update with PDF settings
    const updatedData = {
      ...siteData.data,
      showPdfMenu: showPdfMenu !== undefined ? showPdfMenu : true,
    };

    // Save back to API
    const putResponse = await fetch(`${API_URL}/site`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!putResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to update PDF settings',
        },
        { status: putResponse.status }
      );
    }

    const result = await putResponse.json();

    return NextResponse.json({
      success: true,
      message: 'PDF settings updated successfully',
      data: result.data,
    });
  } catch (error: any) {
    console.error('Error updating PDF settings:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update PDF settings',
      },
      { status: 500 }
    );
  }
}