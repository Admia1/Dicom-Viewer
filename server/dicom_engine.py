from pydicom import dcmread
import os

def gray_level(pixel_array, window_center, window_level):
    min_level = int(window_center - window_level/2)
    max_level = int(window_center + window_level/2)
    print(max_level)
    print(min_level)
    pixel_array[pixel_array<min_level] = min_level
    pixel_array[pixel_array>max_level] = max_level

    return pixel_array

def dcm_signle_file_open(file_path):
    ds = dcmread(file_path)
    pixel_array=ds.pixel_array

    rescale_slope = float(ds.RescaleSlope)
    rescale_intercept = float(ds.RescaleIntercept)
    return pixel_array, rescale_slope, rescale_intercept, ds

a=None
if __name__ == "__main__":
    import matplotlib.pyplot as plt
    path = "/home/admia/DS/COLO/manifest-sFI3R7DS3069120899390652954/CT COLONOGRAPHY/1.3.6.1.4.1.9328.50.4.0001/01-01-2000-1-Abdomen24ACRINColoIRB2415-04 Adult-0.4.1/3.000000-Colosupine  1.0  B30f-4.563"
    file_path = os.path.join(path,"1-044.dcm")
    
    pixel_array, s1,s2, ds = dcm_signle_file_open(file_path)
    pixel_array = gray_level(pixel_array*s1+s2, 50, 100)

    a=pixel_array

    plt.imshow(pixel_array, cmap=plt.cm.gray)
    plt.show()